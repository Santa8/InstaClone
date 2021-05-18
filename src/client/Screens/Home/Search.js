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
  TouchableOpacity,
} from "react-native";
import AuthStyle from "./style/AuthStyle";
import { connect } from "react-redux";
const styles1 = StyleSheet.create({ ...AuthStyle });
import { SearchBar } from "react-native-elements";
import axios from "axios";
import { Icon } from "native-base";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { baseURL } from "../../constants";
import * as icon from "native-base";

function Search(props) {
  const [filtredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);

  const fetchUsers = () => {
    axios({
      method: "post",
      url: "/listUsers",
      baseURL: baseURL,
    })
      .then((res) => {
        setfilteredData(res.data.lista);
        setmasterData(res.data.lista);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  const searchFilter = (text) => {
    setsearch(text);
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
    } else {
      setfilteredData(masterData);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.setItem("publicProfileId", item.Id);
            props.navigation.navigate("ProfilePub");
          }}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={(text) => searchFilter(text)}
        placeholder="Type username here..."
        placeholderTextColor="#edf6f9"
        cancelButtonTitle="Cancel"
        onCancel={() => console.log(onCancel())}
        value={search}
        inputContainerStyle={{ backgroundColor: "#bde0fe" }}
        leftIconContainerStyle={{ backgroundColor: "#bde0fe" }}
        inputStyle={{ backgroundColor: "#bde0fe" }}
        containerStyle={{
          backgroundColor: "#a2d2ff",
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <FlatList
        data={filtredData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
}

Search["navigationOptions"] = {
  tabBarIcon: ({ tintColor }) => (
    <icon.Icon name="ios-search" style={{ color: tintColor }} />
  ),
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    authToken: state.loginReducer.authToken,
  };
};

export default connect(mapStateToProps)(Search);
