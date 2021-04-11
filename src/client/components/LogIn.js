import React, { Component } from 'react'
import {View,Button,TextInput } from 'react-native'
//wimport { withNavigation } from 'react-navigation/native';

export class LogIn extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
        this.LogIn = this.LogIn.bind(this)
    }

    LogIn(){

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
                    onPress={() => this.SignUp()} 
                    title="Log In"  
                />                          
            </View>
        )
    }
}

export default LogIn