
import { Component } from "react";
import React, { useState, useRef, useEffect } from 'react';
import {View,Button,TextInput,Text,Alert,StyleSheet, Header,Image ,
  ScrollView} from 'react-native'
import AuthStyle from './AuthStyle'
import { connect } from 'react-redux';


import axios from "axios";





import { Container, Content, Icon ,  Thumbnail } from 'native-base'

import instalogo from './insta.png'

import dm from './dm.png'

import PostComponent from './PostComponent'

import { isLogedIn } from '../../actions/AuthActions'
import User from "../../serveur/models/user.model";


import { listUsers } from '../../actions/followActions';




class Home extends Component {




   list = [];
  
  constructor(props){
    super(props);
    
      this.state={
        data : []
        
      }
      
  }
  listUsers = () => {
    
     
    axios({
      method: "post",
      url: "/listUsers",
      baseURL: "http://localhost:3000",
    })
      .then((res) => {


        //console.log(res.data.lista);

        this.setState ({ data : res.data.lista  });


      })

      .catch((err) => {
        console.log(err.message);

                });
  };
     

   /*  loadListUsers = () => {

        
      const lista = listUsers();

      this.list=lista;
      console.log(lista);

      this.setState ({ data : lista  });

      return lista;


    }*/




    verifyConnexion = () => {
    if (!isLogedIn()) {
      this.props.navigation.navigate("LogIn");
    }
   } 

   componentDidMount () {


    
    this.verifyConnexion();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.verifyConnexion();
      }
    );
     this.listUsers();
  }
 
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  } 


    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }

    renderUsers = users => {
      
      console.log("dataaa");
      console.log(users);
      return users.map((user,index) => {
        return (
          <View>
                  {/* <Thumbnail
                      style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                      source={require('./me.jpg')} /> */}

                      <Text style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, fontSize : 20 }}> {user.name}  </Text>
                      <Button
                      title= { user.follow ? "unfollow"  : "follow" }
                      style={{ marginHorizontal: 5 , width : 10, height : 10 }}
                       
                      />
          </View>
        );
      });
    };
    

    render() {

    

    

        return (
            <View style={{flex:1, height :100, backgroundColor : "white"}}>

                
                <Image source = {instalogo} style = {{width : 120 , height : 35 ,marginLeft : 20 , tintColor : "black", marginTop : 10 , marginBottom :10}}   ></Image>
                <Image source = {dm} style = {{width : 25 , height : 25 , marginRight : 20 , alignSelf : "flex-end" , tintColor : "black", marginTop : -40 }}   ></Image>
            
                <Container style= {styles.container}>
                <Content>

                <View style={{ height: 100 }}>
                        
                        <View style={{ flex: 3 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    paddingStart: 5,
                                    paddingEnd: 5
                                }}

                            >    
                              {this.renderUsers(this.state.data)}

                            </ScrollView>
                        </View>
                  </View>
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




 
   
export default Home;
