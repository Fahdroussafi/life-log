import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthScreen from '../screens/AuthScreen';

const AuthStack = createNativeStackNavigator();

function Auth() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={AuthScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
    </AuthStack.Navigator>
  );
}

export default Auth;
