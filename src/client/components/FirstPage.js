 import React,{Component} from 'react'
import { Text,Button,View,TouchableOpacity} from 'react-native'
 
 export default function FirstPage({navigation}) {
     return (
         <View style={{flex : 1,justifyContent: 'center'}}>
            <Button
                color="#B01CB0"
                title="Register"
                onPress={() => navigation.navigate("Register")} />
            
            <Button
                title="Login"
                onPress={() => navigation.navigate("LogIn")} />
            
            <Button
                color="#a7b960"
                title="Home"
                onPress={() => navigation.navigate("Home")} />
            <Button
                color="#f2b727"
                title="Profile"
                onPress={() => navigation.navigate("Profile")} />
         </View>
     )
 }
 