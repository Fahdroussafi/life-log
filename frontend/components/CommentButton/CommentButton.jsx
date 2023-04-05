import React, {useState, useContext} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useMutation} from 'react-query';
import {CommentOnPost} from '../../utils/service';

import {CredentialsContext} from '../CredentialsContext';

import {useNavigation} from '@react-navigation/native';

import styles from './styles';

const CommentButton = ({postId, onCommentSubmitted}) => {
  const {storedCredentials} = useContext(CredentialsContext);
  const navigation = useNavigation();

  const [comment, setComment] = useState('');

  const {mutate} = useMutation(CommentOnPost, {
    onSuccess: data => {
      setComment('');
    },
  });

  const handleCommentSubmit = () => {
    if (!comment) {
      ToastAndroid.show(
        'Please enter a comment',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (comment.length > 100) {
      ToastAndroid.show(
        'Comment is too long',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (!storedCredentials.token) {
      // Navigate to login screen with a callback to navigate back to post screen on successful login
      navigation.navigate(
        'Auth',
        {screen: 'Login'},
        {
          callback: () => mutate({postId, comment}),
          screen: 'Post',
        },
      );
    } else {
      onCommentSubmitted(comment);
      mutate({postId, comment});
    }
  };

  return (
    <View style={styles.commentButtonContainer}>
      <Icon
        name="account-circle"
        size={40}
        color="#20B08E"
        style={styles.commentButtonIcon}
      />
      <TextInput
        placeholder="Add a comment..."
        placeholderTextColor={'#000'}
        style={styles.commentButtonInput}
        value={comment}
        onChangeText={text => setComment(text)}
      />
      <Icon.Button
        name="send"
        size={24}
        color="#20B08E"
        onPress={handleCommentSubmit}
        style={styles.commentButtonSend}>
        <Text style={styles.commentButtonSendText}>Send</Text>
      </Icon.Button>
    </View>
  );
};

export default CommentButton;
