import { StatusBar } from 'expo-status-bar';
import React,{useEffect}from 'react';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './src/client/components/FirstPage';
import Register from './src/client/components/Register';
import LogIn from './src/client/components/LogIn';
import HomePage from './src/client/components/HomePage';
import { AuthContext} from './src/client/components/context'

import { Provider } from'react-redux'


const initialLoginStatut ={
  isLoading: true,
  userName: null,
  userToken: null,
}

/*const loginReducer= (prevState, action) => {
  switch(action.type){

    case 'Ret_TOKEN':
      return{
        ...prevState,
        userToken = action.token,
        isLoading: false,
      };

    case 'Login':
      return{
        ...prevState,
        userName: action.id,
        userToken = action.token,
        isLoading: false,
      };

    case 'Logout':
      return{
        ...prevState,
        userName: null,
        userToken = null,
        isLoading: false,
      };  

    case 'Register':
      return{
        ...prevState,
        userName: action.id,
        userToken = action.token,
        isLoading: false,
    };      
  
  }
}*/

/*const [loginStat,dispatch] = React.useReducer(loginReducer,initialLoginStatut);

const authContext = React.useMemo(() => ({
  signIn: (userName,pa)
}*/

const Stack = createStackNavigator();
export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    LogIn: () => {
      setUserToken('ababa');
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken('ababa');
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);},1000);
    },[]);

  if (isLoading){
    return (
      <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" /> 
      </View>
    );
  }
    


  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstPage'>
          <Stack.Screen name='FirstPage' component={FirstPage} options={{headerShown :false}} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='LogIn' component={LogIn} />

          <Stack.Screen name='HomePage' component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
