import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";


import { connect } from "react-redux";

import axios from "axios";
import { modifypost } from "../../actions/postsActions";
import { baseURL } from "../../constants";
import { LikesStyle } from "./LikesStyle";

const styles = StyleSheet.create({ ...LikesStyle });
function LikesPage(props) {
  const [Description, putDescription] = useState("");

  /*static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-pencil" style={{ color: tintColor }} />
    )
  }*/

  const didMountRef = useRef(false);
  // useEffect()to check if states have changed
  // 2nd argument is the list of states you want to watch for
  useEffect(() => {
    
  }, []);
  console.log('yahya')
  console.log(props.likesdata)

  function ItemView ({ item }) {
    return (
      <View style={styles.followUser}>
        <View style={styles.itemUser}>
          <View style={styles.userRow}>
            <Image style={styles.followImage} source={{ uri: item.url }} />
          </View>
        </View>
        <View style={styles.itemUser2}>
          <View style={styles.userRow}>
          
            <Text>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };
  

  
  return (
    <View>
      <FlatList
        data={props.likesdata}
        keyExtractor={(item, index) => index.toString()}
        //ItemSeparatorComponent={this.ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
}
const mapStatetoProps = (state) => {
  return {
    
    likesdata: state.postsReducer.likesdata ,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    //modifypost: (data) => dispatch(modifypost(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(LikesPage);