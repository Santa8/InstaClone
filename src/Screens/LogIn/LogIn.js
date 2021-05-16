import React, { useState, useRef, useEffect } from "react";
import { View, Button, TextInput, Text, Alert, StyleSheet } from "react-native";
const axios = require("axios");
import { connect } from "react-redux";
import AuthStyle from "./AuthStyle";
const styles = StyleSheet.create({ ...AuthStyle });
import { isLogedIn } from "../../actions/AuthActions";
import { login } from "../../actions/loginActions";

function LogIn(props) {
  /*if (isLogedIn()) {
    props.navigation.navigate("Home");
  }*/
  const [email, putEmail] = useState("");
  const [password, putPassword] = useState("");

  // useRef hook to check whether the component has just mounted or updated
  // Link: https://dev.to/savagepixie/how-to-mimic-componentdidupdate-with-react-hooks-3j8c
  const didMountRef = useRef(false);
  // useEffect()to check if states have changed
  // 2nd argument is the list of states you want to watch for
  useEffect(() => {
    console.log("loginScreen.js, props.isAuth: ", props.isAuth);
    console.log("loginScreen.js, props.isLoading: ", props.isLoading);
    if (didMountRef.current) {
      // if login success, go to home screen
      if (props.isAuth) {
        props.navigation.navigate("Home");
      } else if (!props.isAuth && !props.isLoading) {
        Alert.alert(props.errMsg);
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isAuth, props.isLoading]);

  // this function make sure props.login() only be called once
  const loginHandler = () => {
    const loginData = {
      email: email,
      password: password,
    };
    // calling login() dispatch function
    props.login(loginData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INPGRAM </Text>
      <Text style={styles.titleText}>Login</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        id="email"
        onChangeText={(text) => putEmail(text)}
      />
      <TextInput
        style={styles.TextInput}
        id="password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => putPassword(text)}
      />

      <Button onPress={loginHandler} title="Log In" />
      <Button
        onPress={() => props.navigation.navigate("Register")}
        title="Sign Up"
      />
      <Button
        onPress={() => props.navigation.navigate("Home")}
        title="Passage"
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // only map needed states here
    isLoading: state.loginReducer.isLoading,
    isAuth: state.loginReducer.isAuth,
    errMsg: state.loginReducer.errMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    login: (loginData) => dispatch(login(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
