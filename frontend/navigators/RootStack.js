import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';

import Auth from './AuthStack';
import App from './HomeStack';

import HomeScreen from '../screens/HomeScreen';

import {CredentialsContext} from '../components/CredentialsContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <CredentialsContext.Consumer>
      {({storedCredentials}) => (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {storedCredentials ? (
              <Stack.Screen
                name="App"
                component={App}
                options={{animation: 'slide_from_right'}}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Landing"
                  component={LandingScreen}
                  options={{animation: 'slide_from_bottom'}}
                />
                <Stack.Screen
                  name="Auth"
                  component={Auth}
                  options={{animation: 'slide_from_bottom'}}
                />

                {!storedCredentials && (
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{animation: 'slide_from_right'}}
                  />
                )}
              </>
            )}
          </Stack.Navigator>

          <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
}

export default RootStack;
