import React, { useState, useRef, useEffect } from "react";
import { View, Button, Text, TextInput, Alert, StyleSheet } from "react-native";
import { connect } from "react-redux";
const axios = require("axios");

import AuthStyle from "./style/AuthStyle";
const styles = StyleSheet.create({ ...AuthStyle });

import { signup } from "../../actions/signupActions";

import { isLogedIn } from "../../actions/AuthActions";

function Register(props) {
  /*if (isLogedIn()) {
    props.navigation.navigate("Home");
  }*/

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // useRef hook to check whether the component has just mounted or updated

  const didMountRef = useRef(false);
  // useEffect() to check if states have changed
  // 2nd argument is the list of states you want to watch for
  useEffect(() => {
    if (didMountRef.current) {
      // if signup success, go to login screen
      if (props.isAuth) {
        props.navigation.navigate("LogIn");
        Alert.alert("User is saved");
      } else if (!props.isAuth && !props.isLoading) {
        Alert.alert(props.errMsg);
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isAuth, props.isLoading]);

  const signupHandler = () => {
    const signupData = {
      email: email,
      name: name,
      username: username,
      password: password,
    };
    // calling signup() dispatch

    props.signup(signupData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INPGRAM </Text>
      <Text style={styles.titleText}>SignUp </Text>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button
          style={styles.TextInput}
          onPress={signupHandler}
          title="Sign Up"
        />
        <Button
          style={styles.TextInput}
          onPress={() => props.navigation.navigate("LogIn")}
          title="LogIn"
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // only map needed states here
    isLoading: state.signupReducer.isLoading,
    isAuth: state.signupReducer.isAuth,
    errMsg: state.signupReducer.errMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    signup: (signupData) => dispatch(signup(signupData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
