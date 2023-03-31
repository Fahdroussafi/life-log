import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';

const HomeStack = createNativeStackNavigator();

function App() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <HomeStack.Screen
        name="Post"
        component={PostScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </HomeStack.Navigator>
  );
}

export default App;
