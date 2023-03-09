import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const wallpaper = require('../assets/wallpaper.png');

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={wallpaper}
        className="w-full h-full object-cover"
        resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.navigate('Nav')}>
          <Text className="text-[#000000] font-[avenir] tracking-normal font-bold right-10 text-right text-2xl py-10 ">
            Skip
          </Text>
        </TouchableOpacity>
        <View className="flex-1 pl-7">
          <Text className="text-[#000000] font-[avenir] left-16 text-left text-2xl mb-3 tracking-normal">
            It's a Big World
          </Text>
          <Text className="text-[#000000] font-[avenir] text-center text-5xl font-extrabold tracking-widest">
            Out There,
          </Text>
          <Text className="text-[#000000] font-[avenir] text-center text-5xl font-extrabold tracking-widest">
            Go Explore
          </Text>

          <View className="mt-96 items-center">
            <TouchableOpacity
              className="w-60 bg-[#20B08E] p-3 rounded-full"
              onPress={() => navigation.navigate('Auth', {screen: 'Login'})}>
              <Text className="text-[#FFFFFF] font-[avenir] font-bold tracking-widest text-base text-center ">
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
