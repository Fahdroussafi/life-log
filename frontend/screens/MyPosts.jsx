import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from 'react-native';
import {getPostsByCreator, deletePost} from '../utils/service';
import React, {useState} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';

const MyPosts = () => {
  // const [post, setPost] = useState(null);
  // const [posts, setPosts] = useState([]);

  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery('posts', getPostsByCreator);

  const {mutate} = useMutation(deletePost, {
    onSuccess: data => {
      ToastAndroid.show('Post deleted', ToastAndroid.SHORT);
      queryClient.invalidateQueries('posts');
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.txt_main}>My posts</Text>
      </View>

      <ScrollView>
        {data?.map((post, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}>
                  {index + 1}. {post.title}
                </Text>
                <Text style={styles.txt_item}>{post.message}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => mutate(post._id)}>
                  <Text style={styles.txt_del}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header_container: {
    padding: 15,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_main: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  item_course: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_name: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  txt_item: {
    fontSize: 14,
    marginTop: 5,
    color: '#000',
  },

  txt_del: {
    fontSize: 14,
    marginTop: 5,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default MyPosts;
