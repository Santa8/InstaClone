
import { Component } from "react";
import React, { useState, useRef, useEffect } from 'react';
import {View,Button,TextInput,Text,Alert,StyleSheet, Header,Image} from 'react-native'
import AuthStyle from './AuthStyle'
import { connect } from 'react-redux';




import { Container, Content, Icon } from 'native-base'

import instalogo from './insta.png'

import dm from './dm.png'

import PostComponent from './PostComponent'




class Home extends Component {


    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }
    

    render() {
        return (
            <View style={{flex:1, height :100, backgroundColor : "white"}}>

                
                <Image source = {instalogo} style = {{width : 120 , height : 35 ,marginLeft : 20 , tintColor : "black", marginTop : 10 , marginBottom :10}}   ></Image>
                <Image source = {dm} style = {{width : 25 , height : 25 , marginRight : 20 , alignSelf : "flex-end" , tintColor : "black", marginTop : -40 }}   ></Image>
            
                <Container style= {styles.container}>
                <Content>
                    <PostComponent imageSource="1" likes="101" />
                    <PostComponent imageSource="2" likes="201" />
                    <PostComponent imageSource="3" likes="301" />
                    
                </Content>
            </Container>
            </View>

           
           
        );
    }


    

    

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : "white",
        marginTop : 15
    }
});


const mapStateToProps = state => {
    return {
        authToken: state.loginReducer.authToken,
    }
  }

 
   
export default Home;
