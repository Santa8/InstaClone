//import {createStackNavigator} from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import React, { useState, useRef, useEffect } from 'react';
import {View,Button,TextInput,Text,Alert,StyleSheet, Platform } from 'react-native'

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LogIn from '../Screens/LogIn/LogIn';
import Register from '../Screens/LogIn/Register';
import Profile from '../Screens/Profile/Profile';
import Home from '../Screens/Home/Home';
import MainScreen from '../Screens/MainScreen';
import EditProfile from '../Screens/EditProfile/EditProfile'

import Search from '../Screens/Home/Search';





const AppNavigator = createBottomTabNavigator(
    {
        
        Home : {
            screen: Home,
           
         },
         Profile : {
            screen: Profile,
            
         },
         Search : {
            screen: Search,
            
         },
         EditProfile: {
            screen: EditProfile,
            
         } },
         {
            animationEnabled: true,
            swipeEnabled: true,
            tabBarPosition: "bottom",
            tabBarOptions: {
                style: {
                    ...Platform.select({
                        android: {
                            backgroundColor: 'white'
                        }
                    })
                },
                activeTintColor: '#000',
                inactiveTintColor: '#d1cece',
                showLabel: false,
                showIcon: true
            }
        }
  
               
                      );
  
  const AuthNavigator = createStackNavigator(
    {
        LogIn : {
            screen: LogIn,
            
         },
         Register : {
            screen: Register,
           
         },
        }
  );
  const  AppSwitch = createSwitchNavigator( {
      Auth: AuthNavigator,
      App: AppNavigator
    },
    {
      initialRouteName: 'Auth'
    }
  );

  const AppContainer = createAppContainer(AppSwitch)


  export default AppContainer
 
