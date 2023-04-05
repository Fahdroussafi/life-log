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
      })
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fff] ">
      <View className="p-4">
        <View className="flex flex-row justify-between items-center py-2">
          <Text className="text-black text-2xl tracking-widest font-[avenir] font-bold">
            Hi,{' '}
            {storedCredentials.userName ? (
              <Text className="text-[#20B08E] font-bold text-2xl font-[avenir]">
                {storedCredentials.userName}
              </Text>
            ) : (
              <Text className="text-black font-bold text-2xl font-[avenir]">
                Guest
              </Text>
            )}
          </Text>
          {storedCredentials.userName && (
            <TouchableOpacity
              className="w-28 bg-[#20B08E] p-2 rounded-full"
              onPress={clearLogin}>
              <Text className="text-white font-[avenir] font-bold tracking-widest text-base text-center">
                LOGOUT
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Posts />
    </SafeAreaView>
  );
};

export default HomeScreen;
