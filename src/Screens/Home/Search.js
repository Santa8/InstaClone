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


import { Icon } from 'native-base'

function Search(props) {
  const [filtredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);


  

  const fetchUsers = () => {
    const apiURL = "https://jsonplaceholder.typicode.com/posts";
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setfilteredData(responseJson);
        setmasterData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchFilter = (text) => {
    setsearch(text);
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}
        {". "}
        {item.title.toUpperCase()}
      </Text>
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


Search ['navigationOptions']  = {

  tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-search" style={{ color: tintColor }} />
  )
}

const styles = StyleSheet.create({
  container: {
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
});

const mapStateToProps = (state) => {
  return {
    authToken: state.loginReducer.authToken,
  };
};

export default connect(mapStateToProps)(Search);
