import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  FlatList,
} from "react-native";
import AuthStyle from "./AuthStyle";
import { connect } from "react-redux";
const styles1 = StyleSheet.create({ ...AuthStyle });
import { SearchBar } from "react-native-elements";

function Home(props) {}

const mapStateToProps = (state) => {
  return {
    authToken: state.loginReducer.authToken,
  };
};

export default connect(mapStateToProps)(Home);
