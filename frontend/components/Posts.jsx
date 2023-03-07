import React, {useState} from 'react';
import {View, Text, ActivityIndicator, Pressable, FlatList} from 'react-native';

import {getPosts} from '../utils/service';
import {isError, useQuery} from 'react-query';

import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';

const Posts = ({navigation}) => {
  const [showMore, setShowMore] = useState(1);

  const [data, setData] = useState({data: []});

  const showMorePosts = () => {
    setShowMore(showMore + 1);
  };

  const {isLoading, error} = useQuery(
    ['posts', showMore],
    () => getPosts(showMore),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,

      onSuccess: newData => {
        setData(prevData => ({
          prevData,
          data: [...prevData.data, ...newData.data],
        }));
      },
    },
  );

  if (isError(error)) {
    return <Text>Error: {error}</Text>;
  }

  if (data.data.length === 0) {
    return (
      <View className="flex-1 bg-[#F6F6F6] relative">
        <View className="flex flex-col items-center justify-center flex-1">
          <Text className="text-black font-bold text-2xl">No more posts</Text>
        </View>
      </View>
    );
  }

  console.log(data.data.map(item => item._id));

  return (
    <FlatList
      className="flex-1 bg-[#F6F6F6] relative"
      nestedScrollEnabled={true}
      data={data.data}
      renderItem={({item, index}) => (
        <View
          key={index}
          className="flex flex-col items-center justify-center mx-4 p-2 ">
          <View className="bg-white rounded-xl shadow-xl w-80 h-80 border-white border-2">
            <View className="flex flex-col items-start mx-4 ">
              <Text className="text-black font-bold text-base">
                By {item.creator}
              </Text>
              <Text className="text-black font-bold text-base">
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
            <View className="p-3 pt-40 fixed">
              <View className="bg-[#20B08E] w-full rounded-full p-2 flex flex-row justify-between ">
                <Text className="text-black font-bold text-lg ml-4">
                  <Icon name="location-on" size={16} color="#fff" />
                  {item.title}
                </Text>
                <Text className="text-black font-bold text-lg mr-4">
                  Likes:
                  {item.likes && item.likes.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponentStyle={{
        paddingBottom: 20,
      }}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size="large" color="#20B08E" />
        ) : (
          <View className=" flex flex-row justify-center items-center py-4">
            <Pressable
              className="bg-[#20B08E] p-2 rounded-full"
              onPress={showMorePosts}>
              <Text className="text-white font-bold text-lg">Show More</Text>
            </Pressable>
          </View>
        )
      }
    />
  );
};

export default Posts;
