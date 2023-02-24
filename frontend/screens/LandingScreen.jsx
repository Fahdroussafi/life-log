import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const wallpaper = require("../assets/wallpaper.png");

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={wallpaper}
        className="w-full h-full object-cover"
        resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text className="text-[#000000] tracking-normal font-bold right-10 text-right text-2xl py-10 ">
            Skip
          </Text>
        </TouchableOpacity>
        <View className="flex-1 pl-7">
          <Text className="text-[#000000] left-10 text-left text-2xl mb-3 tracking-normal">
            It's a Big World
          </Text>
          <Text className="text-[#000000] text-center text-6xl font-extrabold tracking-widest">
            Out There,
          </Text>
          <Text className="text-[#000000] text-center text-6xl font-extrabold tracking-widest">
            Go Explore
          </Text>

          <View className="mt-[500px] items-center">
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-[#FFFFFF] font-bold tracking-widest text-base bg-[#20B08E] p-3 rounded-full text-center w-60 ">
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
