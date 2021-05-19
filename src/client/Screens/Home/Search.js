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
  Image,
} from "react-native";
import AuthStyle from "./style/AuthStyle";
import { connect } from "react-redux";

import { SearchBar } from "react-native-elements";
import axios from "axios";
import { Icon } from "native-base";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { baseURL } from "../../constants";
import { SearchStyle } from "./SearchStyle";

const styles = StyleSheet.create({ ...SearchStyle });

function Search(props) {
  const [filtredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");

  const [Id, setId] = useState("");

  useEffect(() => {
    (async () => {
      var value = await AsyncStorage.getItem("Id");
      setId(value);
    })();

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
  const getIdValue = async () => {
    var value = await AsyncStorage.getItem("Id");
    setId(value);
    return value;
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styl.followUser}>
        <View style={styl.itemUser}>
          <View style={styl.userRow}>
            <Image style={styl.followImage} source={{ uri: item.url }} />
          </View>
        </View>
        <View style={styl.itemUser2}>
          <View style={styl.userRow}>
            <TouchableOpacity
              style={styl.button}
              onPress={() => {
                if (item.Id === Id) {
                  props.navigation.navigate("Profile");
                } else {
                  console.log("toudaaaa");
                  AsyncStorage.setItem("publicProfileId", item.Id);

                  props.navigation.navigate("ProfilePub");
                }
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>

            <Text>{item.usernameVrai}</Text>
          </View>
        </View>
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
          marginTop: 26,
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
    <Icon name="ios-search" style={{ color: tintColor }} />
  ),
};

const styl = StyleSheet.create({
  itemUser: {
    width: "30%", // is 50% of container width
  },
  itemUser2: {
    width: "50%", // is 50% of container width
  },
  userRow: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
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
  userImage: {
    borderRadius: 70,
    height: 100,
    marginBottom: 10,
    width: 100,
  },
  followUser: {
    backgroundColor: "#FFF",
    marginBottom: 15,
    marginTop: 25,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  followImage: {
    borderRadius: 40,
    height: 80,
    marginBottom: 10,
    width: 80,
  },

  userNameRow: {
    marginBottom: 2,
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  userRow: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
  nameSize: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return {
    authToken: state.loginReducer.authToken,
  };
};

export default connect(mapStateToProps)(Search);
