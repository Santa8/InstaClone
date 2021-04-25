import React, { Component } from 'react'
import {View,Button,TextInput } from 'react-native'
const axios = require('axios');

//wimport { withNavigation } from 'react-navigation/native';

export class LogIn extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
        this.LogIn = this.LogIn.bind(this)

        //this.signIn = this.signIn.bind(this)

    }

    
    LogIn(){
        const { email, password, username } = this.state;
        
        axios({
            method: 'post',
            url: '/login',
            baseURL: 'http://localhost:3000',
            data: {
              email: email,
              password: password
            }
            })

        .then(function (reponse) {
                //On traite la suite une fois la réponse obtenue 
                if(reponse.data.auth){
                    localStorage.setItem("token",reponse.data.token);
                    console.log("Logged In");
               }
               else{
                console.log(reponse.data.error)

           }
        })
        .catch(function (error) {
                //On traite ici les erreurs éventuellement survenues

                console.log(error);
        });


    }



    render() {
        return (
            <View>
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />  
                
                <Button
                    onPress={() => this.LogIn()} 
                    title="Log In"  
                />                          
            </View>
        )
    }
}

export default LogIn