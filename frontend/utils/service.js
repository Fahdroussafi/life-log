import axios from 'axios';
import {API_URL} from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login({email, password}) {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function register({email, password, name}) {
  const response = await axios.post(`${API_URL}/api/auth/register`, {
    email,
    password,
    name,
  });
  return response.data;
}

export async function getPosts(page) {
  const response = await axios.get(
    `${API_URL}/api/posts/getPosts?&page=${page}`,
  );
  return response.data;
}

export async function searchPosts(searchQuery) {
  const response = await axios.get(
    `${API_URL}/api/posts/search/?searchQuery=${
      searchQuery.search || 'none'
    }&tags=${searchQuery.tags}`,
  );
  return response.data;
}

export async function getPost(postId) {
  const response = await axios.get(`${API_URL}/api/posts/${postId}`);
  return response.data;
}

export async function CommentOnPost({postId, comment}) {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/api/posts/${postId}/commentPost`,
    {
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
