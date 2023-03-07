import React, {useContext} from 'react';
import {CredentialsContext} from './../components/CredentialsContext';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';

import NewPost from '../screens/NewPost';
import PostsLiked from '../screens/PostsLiked';

import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-filled';
          } else if (route.name === 'Login') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Posts Liked') {
            iconName = focused ? 'favorite' : 'favorite-border';
          } else if (route.name === 'New Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          return (
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: focused ? '#20B08E' : 'transparent',
                }}>
                <Icon
                  name={iconName}
                  size={25}
                  color={focused ? '#fff' : 'black'}
                />
                {focused && (
                  <View
                    style={{
                      backgroundColor: '#fff',
                    }}
                  />
                )}
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: '#20B08E',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          display: 'flex',
          height: 45,
          backgroundColor: '#fff',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="New Post"
        component={NewPost}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Posts Liked"
        component={PostsLiked}
        options={{headerShown: false}}
      />

      {!storedCredentials && (
        <Tab.Screen
          name="Login"
          component={AuthScreen}
          options={{headerShown: false}}
        />
      )}
    </Tab.Navigator>
  );
};

export default Tabs;
