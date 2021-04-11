import { StatusBar } from 'expo-status-bar';
import React from 'react';
const mongoose = require('mongoose')

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './src/client/components/FirstPage';
import Register from './src/client/components/Register';
import LogIn from './src/client/components/LogIn';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstPage'>
          <Stack.Screen name='FirstPage' component={FirstPage} options={{headerShown :false}} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='LogIn' component={LogIn} />

      </Stack.Navigator>

    </NavigationContainer>

  );
}
