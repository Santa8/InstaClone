import React, { Component } from 'react'
import {View,Button,TextInput } from 'react-native'
const axios = require('axios');

//wimport { withNavigation } from 'react-navigation/native';

export class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            username:''
        }
        this.SignUp = this.SignUp.bind(this)
    }

    SignUp(){
        const { email, password, username } = this.state;
        axios({
            method: 'post',
            url: '/register',
            baseURL: 'http://localhost:3000',
            data: {
              name: username,
              email: email,
              password: password
            }
            })

        .then(function (reponse) {
                //On traite la suite une fois la réponse obtenue 
                console.log(reponse);
        })
        .catch(function (error) {
                //On traite ici les erreurs éventuellement survenues
                console.log(error["data"]);
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
                    placeholder="username"
                    onChangeText={(username) => this.setState({ username })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />  
                <Button
                    onPress={() => this.SignUp()} 
                    title="Sign Up"  
                />                          
            </View>
        )
    }
}

export default Register
//wexport default withNavigation(Register);
