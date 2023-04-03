import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useMutation} from 'react-query';
import {CommentOnPost} from '../utils/service';

const CommentButton = ({postId, onCommentSubmitted}) => {
  const [comment, setComment] = useState('');

  const {mutate} = useMutation(CommentOnPost, {
    onSuccess: data => {
      console.log(data.comments);
      setComment('');
      // onCommentSubmitted(data.comments[data.comments.length - 1]);
    },
  });

  const handleCommentSubmit = () => {
    if (!comment) {
      console.log('Comment is empty!');
      return;
    }
    onCommentSubmitted(comment);
    mutate({postId, comment});
  };

  return (
    <View className="flex flex-row items-center justify-between bg-white">
      <TextInput
        placeholder="Add a comment..."
        placeholderTextColor={'#20B08E'}
        style={{flex: 1, marginLeft: 10, color: 'black'}}
        value={comment}
        onChangeText={text => setComment(text)}
      />
      <Icon.Button
        name="send"
        size={24}
        color="#20B08E"
        backgroundColor="#FFF"
        onPress={handleCommentSubmit}
        style={{backgroundColor: '#FFF'}}>
        <Text style={{color: '#20B08E', marginLeft: 5}}>Send</Text>
      </Icon.Button>
    </View>
  );
};

export default CommentButton;
