import React, {useState, useEffect, useContext, useCallback} from 'react';
import {TouchableOpacity, View, Text, ToastAndroid} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CredentialsContext} from './../components/CredentialsContext';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../env';

const LikeButton = ({postId}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const {storedCredentials} = useContext(CredentialsContext);

  const checkLiked = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const res = await axios.get(
          `${API_URL}/api/posts/${postId}/checkIfLiked`,
          {headers: {Authorization: `Bearer ${token}`}},
        );
        setLiked(res.data.isLiked);
      } else {
        setLiked(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  const getLikesCount = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/posts/${postId}/likesCount`);
      setLikesCount(res.data.likesCount);
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  const handleLike = useCallback(async () => {
    try {
      if (!storedCredentials.token) {
        ToastAndroid.show(
          'You must be logged in to like a post',
          ToastAndroid.SHORT,
        );

        return;
      }
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const res = await axios.patch(
          `${API_URL}/api/posts/${postId}/likePost`,
          {},
          {headers: {Authorization: `Bearer ${token}`}},
        );
        setLiked(res.data.liked);
        setLikesCount(res.data.updatedPost.likes.length);
      }
    } catch (err) {
      console.log(err);
    }
  }, [postId, liked, likesCount]);

  useEffect(() => {
    Promise.all([checkLiked(), getLikesCount()]);
  }, [checkLiked, getLikesCount]);

  useEffect(() => {
    if (!storedCredentials) {
      setLiked(false);
      setLikesCount(0);
    }
  }, [storedCredentials]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', checkLiked);
    return unsubscribe;
  }, [navigation, checkLiked]);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleLike}>
        <MaterialCommunityIcons
          name={liked ? 'favorite' : 'favorite-border'}
          size={24}
          color={liked ? 'red' : 'black'}
        />
      </TouchableOpacity>
      <Text style={{marginLeft: 5, color: 'black'}}>{likesCount}</Text>
    </View>
  );
};

export default LikeButton;
