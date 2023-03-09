import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {CredentialsContext} from './../components/CredentialsContext';

import Posts from '../components/Posts';

const HomeScreen = () => {
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const clearLogin = () => {
    AsyncStorage.clear()
      .then(() => {
        setStoredCredentials('');
        // navigation.navigate('Auth', {screen: 'Login'});
      })
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6] relative">
      <View className="p-5">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-black text-2xl py-5">
            Hi{' '}
            <Text className="text-black font-bold text-2xl font-[avenir]">
              {storedCredentials ? storedCredentials : 'Guest'}
            </Text>
          </Text>
          {storedCredentials && (
            <TouchableOpacity
              className="w-28 bg-[#20B08E] p-2 rounded-full"
              onPress={clearLogin}>
              <Text className="text-[#FFFFFF] font-[avenir] font-bold tracking-widest text-base text-center">
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-black font-extrabold tracking-normal text-3xl font-[avenir]">
          Where do you want to go ?
        </Text>
      </View>
      <Posts />
    </SafeAreaView>
  );
};

export default HomeScreen;
