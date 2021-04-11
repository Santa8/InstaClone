import React, { Component } from 'react'
import {View,Button,TextInput } from 'react-native'
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
