import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  AsyncStorage,
} from "react-native";
//import { launchImageLibrary} from 'react-native-image-picker';
//import {AsyncStorage} from "@react-native-async-storage/async-storage"
//import {AsyncStorage} from "@react-native-community/async-storage"
//var ImagePicker = require('react-native-image-picker');
import EditStyle from "./EditStyle";
//mport { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
import { Item, Input } from "native-base";
import { connect } from "react-redux";
//export const ImageProfil = require('./imagea.jpeg');
const styles = StyleSheet.create({ ...EditStyle });
import axios from "axios";
import { modifypost } from "../../actions/postsActions";
import { baseURL } from "../../constants";

import { Icon } from "native-base";

function EditPost(props) {
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
    putDescription(props.postdata.description);
    if (didMountRef.current) {
      // if login success, go to home screen
      if (props.isModified) {
        props.navigation.navigate("Profile");
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isModified]);

  const ModifyPost = () => {
    const data = {
      urlpost: props.postdata.urlpost,
      userid: props.postdata.userid,
      postid: props.postdata.Id,
      description: Description,
    };

    // calling login() dispatch function
    props.modifypost(data);
  };

  const DeletePost = () => {
    axios({
      method: "post",
      url: "/DeletePost",
      baseURL: baseURL,
      data: {
        userid: props.postdata.userid,
        postid: props.postdata.Id,
      },
    })
      .then((res) => {
        //console.log(res)
        const message = res.data.message;

        if (res.data.value) {
          console.log(message);
          props.navigation.navigate("Profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.userRow}>
        <Image
          style={styles.userImage}
          source={{ uri: props.postdata.urlpost }}
        />

        <View style={styles.container}>
          <View style={styles.item1}>
            <Text>Description</Text>
          </View>
          <View regular style={styles.item2}>
            <TextInput
              style={styles.TextBioInput}
              onChangeText={(text) => putDescription(text)}
              value={Description}
              autoCapitalize="none"
            />
          </View>
        </View>

        <Button title="Modify Post" onPress={ModifyPost} />
        <Button title="Delete Post" onPress={DeletePost} />
      </View>
    </View>
  );
}
const mapStatetoProps = (state) => {
  return {
    isModified: state.postsReducer.isModified,
    postdata: state.postsReducer.postdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    modifypost: (data) => dispatch(modifypost(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditPost);
