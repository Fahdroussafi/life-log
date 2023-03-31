import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';
import {getPosts, searchPosts} from '../utils/service';
import {useNavigation} from '@react-navigation/native';

import styles from '../components/styles';

import LikeButton from '../components/LikeButton';

const Posts = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const flatListRef = useRef(null);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await handleSearch(searchQuery, 1);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, [searchQuery]);

  const handleSearch = useCallback(async (searchText, page = 1) => {
    try {
      setLoading(true);
      const {data} = await searchPosts({
        search: searchText,
        tags: 'none',
      });
      setData(prevData => (page === 1 ? data : [...prevData, ...data]));
      setPageNumber(page);
      setEndReached(false);
      if (flatListRef.current) {
        flatListRef.current?.scrollToOffset({offset: 0, animated: true});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setEndReached(pageNumber >= totalPages);
    setPageNumber(pageNumber + 1);
  }, [pageNumber, totalPages]);

  // add index to each item in the data array
  // descrture data instead of passing the entire data array to the FlatList
  const dataWithIndex = useMemo(() => {
    return data.map((item, index) => ({...item, index}));
  }, [data]);

  const renderPost = ({item, index}) => (
    <View style={styles.postContainer}>
      <TouchableOpacity
        key={`${item._id}-${item.index}`}
        onPress={() => navigation.navigate('App', {screen: 'Post'})}>
        <Image
          style={styles.postImage}
          source={{uri: item.selectedFile}}
          resizeMode="cover"
        />
        <View style={styles.postHeader}>
          <Text style={styles.postAuthor}>By {item.creator.name}</Text>
          <Text style={styles.postDate}>
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
        <View style={styles.postBody}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postContent}>{item.content}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.postFooter}>
        <View style={styles.postLikes}>
          <LikeButton postId={item._id} />
        </View>

        <View style={styles.postComments}>
          <Icon name="comment" size={25} color="#20B08E" />
          <Text style={styles.postCommentsCount}>
            {item.comments.length > 0 ? item.comments.length : 0}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={{padding: 10}}>
        <ActivityIndicator size="large" color="#20B08E" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View className="flex-1 bg-[#F6F6F6] items-center justify-center">
          <Text className="text-black text-center">Looking for posts...</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-[#F6F6F6] items-center justify-center">
        <Text className="text-black text-center">No posts found.</Text>
      </View>
    );
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, 1);
    } else {
      setLoading(true);
      getPosts(pageNumber)
        .then(response => {
          setData(prevData =>
            pageNumber === 1 ? response.data : [...prevData, ...response.data],
          );
          setTotalPages(response.numberOfPages);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [pageNumber]);

  return (
    <View className="flex-1 bg-[#242424]">
      <View className="flex flex-row items-center justify-between mx-4 mt-4">
        <Text className="text-white font-bold text-xl tracking-widest">
          Create you own post
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Nav', {screen: 'Create Post'})}>
          <Icon name="add" size={30} color="#20B08E" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-between mx-4 mt-4">
        <TextInput
          placeholder="Search posts"
          placeholderTextColor={'#000'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="bg-[#FFF] p-2 mb-2 rounded-3xl w-[80%] text-black"
        />
        <TouchableOpacity
          onPress={() => {
            handleSearch(searchQuery, 1);
          }}>
          <Icon name="search" size={32} color="#20B08E" />
        </TouchableOpacity>
      </View>

      <FlatList
        // initialNumToRender={5}
        data={dataWithIndex}
        renderItem={renderPost}
        keyExtractor={item => `${item._id}-${item.index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#20B08E']}
            progressBackgroundColor="#F6F6F6"
          />
        }
      />
    </View>
  );
};

export default Posts;
