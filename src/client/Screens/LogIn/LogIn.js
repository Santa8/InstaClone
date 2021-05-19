import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  View,
  Button,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
const axios = require("axios");
import { connect } from "react-redux";
import AuthStyle from "./style/AuthStyle";
const styles = StyleSheet.create({ ...AuthStyle });
import { isLogedIn } from "../../actions/AuthActions";
import { login } from "../../actions/loginActions";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTS } from "../../constants";
import insta from "../../assets/image/insta.png";

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

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Image
          source={insta}
          resizeMode="contain"
          style={{
            width: "60%",
          }}
        />
      </View>
    );
  }

  function renderButton(text, onPress) {
    return (
      <View style={{ margin: SIZES.padding * 0.5, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            height: 60,
            width: 250,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 0.2,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onPress}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary]}
        style={{ flex: 1, alignItems: "center" }}
      >
        <ScrollView>
          <View>
            {renderLogo()}

            <Text style={styles.titleText}>Login</Text>
            <View style={{ marginBottom: 20 }}>
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
            </View>
            {renderButton("LogIn", loginHandler)}
            {renderButton("SignUp", () =>
              props.navigation.navigate("Register")
            )}
            {renderButton("Passage", () => props.navigation.navigate("Home"))}
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
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
