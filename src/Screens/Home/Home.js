import React, { useState, useRef, useEffect } from 'react';
import {View,Button,TextInput,Text,Alert,StyleSheet } from 'react-native'
import AuthStyle from './AuthStyle'
import { connect } from 'react-redux';
const styles = StyleSheet.create({ ...AuthStyle})



function Home(props) {

    /*useEffect(() => {
        setTimeout(() => {
          props.navigation.navigate(props.authToken ? 'App' : 'Auth');
        }, 20000);
      }, []);*/

      //const didMountRef = useRef(false);
      //const user_id = props.authToken;

      /*fetchUserDetails=(user_id)=>{
        //console.log(user_id);
        axios.get("http://localhost:3000/getUserDetails/"+user_id,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            this.setState({email:res.data.results[0].email});
            this.setState({profileImage:res.data.results[0].profileImage})
        })
        .catch(err=>console.log(err))
    }*/

    return (
            
        <View style={styles.container}>
            <Text> {props.authToken}</Text>
            <Button
                onPress={() => props.navigation.navigate('Profile')} 
                title="Profil"  
            />  
             <Button
                onPress={() => props.navigation.navigate('LogIn')} 
                title="Retour"  
            />                          
        </View>
       
    );


}
const mapStateToProps = state => {
    return {
        authToken: state.loginReducer.authToken,
    }
  }

 
   
export default connect(mapStateToProps)(Home);