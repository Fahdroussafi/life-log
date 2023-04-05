import React, {useState, useContext} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useMutation} from 'react-query';
import {CommentOnPost} from '../utils/service';

import {CredentialsContext} from '../components/CredentialsContext';

const CommentButton = ({postId, onCommentSubmitted}) => {
  const {storedCredentials} = useContext(CredentialsContext);

  const [comment, setComment] = useState('');

  const {mutate} = useMutation(CommentOnPost, {
    onSuccess: data => {
      setComment('');
    },
  });

  const handleCommentSubmit = () => {
    !comment
      ? ToastAndroid.show(
          'Please enter a comment',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
      : comment.length > 100
      ? ToastAndroid.show(
          'Comment is too long',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
      : !storedCredentials.token
      ? ToastAndroid.show(
          'Please login to comment',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
      : (onCommentSubmitted(comment), mutate({postId, comment}));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
      }}>
      <Icon
        name="account-circle"
        size={40}
        color="#20B08E"
        style={{marginRight: 10, marginLeft: 10}}
      />
      <TextInput
        placeholder="Add a comment..."
        placeholderTextColor={'#000'}
        style={{color: 'black', marginRight: 100}}
        value={comment}
        onChangeText={text => setComment(text)}
      />
      <Icon.Button
        name="send"
        size={24}
        color="#20B08E"
        onPress={handleCommentSubmit}
        style={{backgroundColor: '#F0F0F0'}}>
        <Text
          style={{
            color: '#20B08E',
          }}>
          Send
        </Text>
      </Icon.Button>
    </View>
  );
};

export default CommentButton;
