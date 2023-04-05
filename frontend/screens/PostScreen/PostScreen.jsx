import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {useQuery} from 'react-query';
import {getPost} from '../../utils/service';

import CommentButton from '../../components/CommentButton/CommentButton';

import styles from '../PostScreen/styles';

import LikeButton from '../../components/LikeButton';

import {CredentialsContext} from '../../components/CredentialsContext';
const PostScreen = ({route}) => {
  const {storedCredentials} = useContext(CredentialsContext);

  const {postId} = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const {data, isLoading, error} = useQuery(
    ['post', postId],
    () => getPost(postId),
    {
      onSuccess: data => {
        setPost(data);
        setComments(data.comments);
      },
    },
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#20B08E" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Error...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#20B08E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.postScreenContainer}>
      <ScrollView>
        {post && (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                style={styles.postImage}
                source={{uri: post.selectedFile}}
                resizeMode="cover"
              />
            </View>
            <View style={styles.postFooter}>
              <LikeButton postId={post._id} />

              <View style={styles.postComments}>
                <Icon name="comment" size={24} color="#20B08E" />
                <Text style={styles.postCommentsText}>
                  {post.comments.length}
                </Text>
              </View>
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.message}</Text>
            <Text style={styles.postDate}>
              {moment(post.createdAt).fromNow()}
            </Text>
            <View style={styles.postTags}>
              {post.tags.map(tag => (
                <Text style={styles.postTag}>
                  # {''}
                  {tag}
                </Text>
              ))}
            </View>
            <View style={styles.postCreatorContainer}>
              <Text style={styles.postCreator}>
                Posted by: {''}
                {post.creator.name}{' '}
              </Text>
            </View>
            <View style={styles.postCommentContainer}>
              <CommentButton
                postId={post._id}
                onCommentSubmitted={comment => {
                  const newComment = {
                    text: comment,
                    createdAt: new Date().toISOString(),
                    user: {
                      name: storedCredentials.userName,
                      _id: storedCredentials._id,
                    },
                  };
                  setComments(prevComments => [...prevComments, newComment]);
                }}
              />
            </View>

            <View>
              <FlatList
                data={comments}
                keyExtractor={(item, index) => item._id + index.toString()}
                renderItem={({item}) => (
                  <View style={styles.postCommentItemContainer}>
                    <View style={styles.postCommentItem}>
                      <Text style={{color: '#242424'}}>{item.text}</Text>
                      <Text style={{color: '#242424'}}>{item.user.name}</Text>
                      <Text style={{color: '#242424', fontSize: 10}}>
                        {moment(item.createdAt).fromNow()}
                      </Text>
                    </View>
                    <View style={styles.postCommentLine}></View>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostScreen;
