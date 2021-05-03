//import {createStackNavigator} from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LogIn from '../Screens/LogIn/LogIn';
import Register from '../Screens/LogIn/Register';
import Profile from '../Screens/Profile/Profile';
import Home from '../Screens/Home/Home';
import EditProfile from '../Screens/EditProfile/EditProfile'



const AppNavigator = createBottomTabNavigator(
    {
        
       Home : {
            screen: Home,
            navigationOptions:{
                header :null
             }
         },
         Profile : {
            screen: Profile,
            navigationOptions:{
                header :null
             }
         },
         EditProfile: {
            screen: EditProfile,
            navigationOptions:{
                header :null
             }
         },
  
               }
                      );
  
  const AuthNavigator = createStackNavigator(
    {
        LogIn : {
            screen: LogIn,
            navigationOptions:{
                header :null
             }
         },
         Register : {
            screen: Register,
            navigationOptions:{
                header :null
             }
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
 
