import { Component } from "react";
import React, { useState, useRef, useEffect } from 'react';
import {View,Button,TextInput,Text,Alert,StyleSheet } from 'react-native'
import { connect } from 'react-redux';

import { TabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import HomeTab from './Home/Home'
import EditProfile from './EditProfile/EditProfile'
import Profile from './Profile/Profile'

import RootNavigation from '../navigation/rootNavigation';



class MainScreen extends Component {

   
    
   

    render() {
        return (


            <RootNavigation />
           
        );
    }


}


export default MainScreen;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});




 
   
