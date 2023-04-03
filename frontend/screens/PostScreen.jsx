import React, {useState} from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {useQuery} from 'react-query';
import {getPost} from '../utils/service';

import CommentButton from '../components/CommentButton';

import styles from '../components/styles';

import LikeButton from '../components/LikeButton';

const PostScreen = ({route}) => {
  const {postId} = route.params;
  const [post, setPost] = useState(null);

  const {data, isLoading, error} = useQuery(
    ['post', postId],
    () => getPost(postId),
    {
      onSuccess: data => {
        setPost(data);
      },
    },
  );

  if (isLoading) {
    return (
      <View className="flex flex-col items-center justify-center">
        <Text className="text-2xl font-bold text-black">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex flex-col items-center justify-center">
        <Text className="text-2xl font-bold text-black">Error...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#3B3C36',
      }}>
      {post && (
        <View style={styles.postContainer}>
          <Image
            style={styles.postImage}
            source={{uri: post.selectedFile}}
            resizeMode="cover"
          />
          <Text style={styles.postDate}>
            {moment(post.updatedAt).fromNow()}
          </Text>
          <Text style={styles.postTitle}>{post.creator.name}</Text>
          <Text style={styles.postDescription}>{post.message}</Text>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <LikeButton postId={post._id} />

            <View style={styles.postComments}>
              <Icon name="comment" size={24} color="#20B08E" />
              <Text style={{color: '#20B08E', marginLeft: 5}}>
                {post.comments.length}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <CommentButton
              postId={post._id}
              onCommentSubmitted={comments => {
                setPost(prevPost => ({
                  ...prevPost,
                  comments: [...prevPost.comments, comments],
                }));
              }}
            />

            <View style={{marginTop: 10}}>
              <FlatList
                data={post.comments}
                keyExtractor={(item, index) => item._id + index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      borderRadius: 10,
                      padding: 10,
                      marginVertical: 5,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{color: '#242424'}}>{item}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostScreen;
