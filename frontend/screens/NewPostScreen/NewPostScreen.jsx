import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import React, {useState, useContext} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tags from 'react-native-tags';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '../../utils/firebase';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext';

import SpinnerButton from 'react-native-spinner-button';

import styles from '../NewPostScreen/styles';

import {API_URL} from '../../env';

const NewPost = ({navigation}) => {
  //context
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const createPost = async () => {
    if (title === '' || message === '' || tags.length === 0) {
      ToastAndroid.show(
        'Please fill in all the fields to create a new post',
        ToastAndroid.SHORT,
      );
    } else if (selectedFile) {
      setLoading(true);
      {
        const response = await fetch(selectedFile.assets[0].uri);

        const blob = await response.blob();
        const filename = selectedFile.assets[0].uri.substring(
          selectedFile.assets[0].uri.lastIndexOf('/') + 1,
        );
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
          await ref;
          const imageUrl = await firebase
            .storage()
            .ref(filename)
            .getDownloadURL();
          const token = await AsyncStorage.getItem('token');
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          const body = JSON.stringify({
            title,
            message,
            tags,
            selectedFile: imageUrl,
          });
          const res = await axios.post(
            `${API_URL}/api/posts/createPost`,
            body,
            config,
          );

          ToastAndroid.show('Post created successfully', ToastAndroid.SHORT);
          setLoading(false);
          setTitle('');
          setMessage('');
          setTags([]);
          setSelectedFile(null);
        } catch (e) {
          console.log(e);
          Alert.alert('An error occurred while creating the post.', e.message);
        }
      }
    }
  };

  if (!storedCredentials.token) {
    return (
      <View style={styles.container2}>
        <Text style={styles.header2}>
          You need to log in to create a new post
        </Text>
        <TouchableOpacity
          className="w-60 bg-[#20B08E] p-3 rounded-full"
          onPress={() => navigation.navigate('Auth', {screen: 'Login'})}>
          <Text className="text-[#FFFFFF] font-[avenir] font-bold tracking-widest text-base text-center ">
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickImage = async () => {
    let options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedFile(response);
      }
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>Create a new post</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={'#000'}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            placeholderTextColor={'#000'}
            multiline
            numberOfLines={4}
          />
          <Text style={{marginBottom: 8, color: '#000'}}>Enter your tags</Text>
          <Tags
            initialTags={tags}
            onChangeTags={newTags => setTags(newTags)}
            onTagPress={index => {
              const newTags = [...tags];
              newTags.splice(index, 1);
              setTags(newTags);
            }}
            containerStyle={{marginBottom: 16}}
            inputStyle={{color: '#000'}}
            inputWrapperStyle={{
              backgroundColor: '#eee',
              borderWidth: 1,
              borderColor: '#FFF',
              borderRadius: 5,
              padding: 8,
              marginBottom: 16,
            }}
            maxNumberOfTags={5}
            renderTag={({tag, index, onPress}) => (
              <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                <View style={styles.tag}>
                  <Text style={{color: '#000', marginRight: 8}}>{tag}</Text>
                  <Icon name="close" size={16} color="#333" />
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={styles.imageContainer}>
            {selectedFile && (
              <Image
                source={{uri: selectedFile.assets[0].uri}}
                style={{width: 200, height: 200}}
              />
            )}
          </View>
          <View style={styles.imageContainer}>
            {!selectedFile && (
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Icon name="image" size={30} color="#20B08E" />
                <Text style={styles.uploadText}>Pick an image</Text>
              </TouchableOpacity>
            )}

            {selectedFile && (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => setSelectedFile(null)}>
                <Icon name="close" size={30} color="#20B08E" />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex flex-row justify-center items-center mt-2">
            <SpinnerButton
              buttonStyle={styles.button}
              isLoading={loading}
              onPress={createPost}
              indicatorCount={10}>
              <Text className="text-[#FFFFFF] font-[avenir] font-bold tracking-widest text-base text-center ">
                {loading ? 'Creating post...' : 'CREATE POST'}
              </Text>
            </SpinnerButton>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NewPost;
