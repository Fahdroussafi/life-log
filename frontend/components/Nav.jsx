import React, {useContext} from 'react';
import {CredentialsContext} from './../components/CredentialsContext';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';

import NewPost from '../screens/NewPostScreen/NewPostScreen';
import PostsLiked from '../screens/MyPosts';

import {View, KeyboardAvoidingView, Platform} from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {storedCredentials} = useContext(CredentialsContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-filled';
            } else if (route.name === 'Login') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'My Posts') {
              iconName = focused ? 'favorite' : 'favorite-border';
            } else if (route.name === 'Create Post') {
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
                <>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
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
                </>
              </View>
            );
          },
          tabBarActiveTintColor: '#20B08E',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            display: 'flex',
            height: 50,
            backgroundColor: '#F6F6F6',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
          },
          // tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Create Post"
          component={NewPost}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="My Posts"
          component={PostsLiked}
          options={{headerShown: false}}
        />

        {!storedCredentials.token && (
          <Tab.Screen
            name="Login"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        )}
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default Tabs;
