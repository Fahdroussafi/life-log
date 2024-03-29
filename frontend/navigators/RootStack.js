import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';

import Auth from './AuthStack';
import App from './HomeStack';

import Nav from '../components/Nav';

import {CredentialsContext} from '../components/CredentialsContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <CredentialsContext.Consumer>
      {({storedCredentials}) => (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {storedCredentials.token ? (
              <>
                <Stack.Screen name="Nav" component={Nav} />
                <Stack.Screen name="App" component={App} />
              </>
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
                  options={{
                    animation: 'slide_from_bottom',
                  }}
                />

                {!storedCredentials.token && (
                  <Stack.Screen
                    name="Nav"
                    component={Nav}
                    options={{animation: 'slide_from_right'}}
                  />
                )}
                <Stack.Screen name="App" component={App} />
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
