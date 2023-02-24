/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View className="p-3 mt-2">
      <Icon
        name="arrow-back"
        size={24}
        color="#000000"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader />,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader />,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader />,
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>

      <StatusBar barStyle="light-content" />
    </NavigationContainer>
  );
}

export default App;
