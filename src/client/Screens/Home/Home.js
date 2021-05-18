import { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Header,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import axios from "axios";

import { Container, Content, Icon, Thumbnail } from "native-base";

import instalogo from "../../assets/image/insta.png";

import dm from "../../assets/image/dm.png";

import PostComponent from "./PostComponent";

import { isLogedIn } from "../../actions/AuthActions";

import { baseURL } from "../../constants";

class Home extends Component {
  list = [];

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      posts: [],
      Id: "",
      test: 0,
    };
  }

  getIdValue = async () => {
    var value = await AsyncStorage.getItem("Id");
    this.Id = value;
    return value;
  };

  listUsers = () => {
    axios({
      method: "post",
      url: "/listUsers",
      baseURL: baseURL,
      data: {
        Id: this.Id,
      },
    })
      .then((res) => {
        this.setState({ data: res.data.lista });
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  listPosts = () => {
    axios({
      method: "post",
      url: "/listPosts",

      baseURL: baseURL,
      data: {
        Id: this.Id,
      },
    })
      .then((res) => {
        this.setState({ posts: res.data.totalPosts });
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  verifyConnexion = () => {
    if (!isLogedIn()) {
      this.props.navigation.navigate("LogIn");
    }
  };

  async componentDidMount() {
    this.verifyConnexion();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.verifyConnexion();
      }
    );
    await this.getIdValue();
    this.listUsers();
    this.listPosts();
    this.render();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    ),
  };

  renderUsers = (users) => {
    return users.map((user, index) => {
      let followRequest = () => {
        axios({
          method: "post",
          url: "/follow",
          baseURL: baseURL,
          data: {
            Id: this.Id,

            followId: user.Id,
          },
        })
          .then((res) => {
            this.setState({ test: 1 });
            this.listUsers();
            this.listPosts();
          })

          .catch((err) => {
            console.log(err.message);
          });
      };

      let unfollowRequest = () => {
        axios({
          method: "post",
          url: "/unfollow",
          baseURL: baseURL,
          data: {
            Id: this.Id,
            followId: user.Id,
          },
        })
          .then((res) => {
            this.setState({ test: 1 });
            this.listUsers();
            this.listPosts();
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

      let onpress = user.follow ? unfollowRequest : followRequest;
      let text = user.follow ? "unfollow" : "follow";
      return (
        <View>
          <Text
            style={{
              marginHorizontal: 5,
              borderColor: "dark",
              borderWidth: 2,
              fontSize: 20,
            }}
          >
            {user.name}
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
              width: 90,
              height: 30,
              backgroundColor: "#DDDDDD",
            }}
            onPress={onpress}
          >
            <Text style={{ fontSize: 20 }}> {text} </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  renderPosts = (posts) => {
    return posts.map((post, index) => {
      var name = post.username;
      var url = post.posts;
      var userpicurl = post.picurl;

      return (
        <PostComponent
          imageSource={url}
          likes="101"
          username={name}
          userpicurl={userpicurl}
        />
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1, height: 100, backgroundColor: "white" }}>
        <Image
          source={instalogo}
          style={{
            width: 120,
            height: 35,
            marginLeft: 20,
            tintColor: "black",
            marginTop: 10,
            marginBottom: 10,
          }}
        ></Image>
        <Image
          source={dm}
          style={{
            width: 25,
            height: 25,
            marginRight: 20,
            alignSelf: "flex-end",
            tintColor: "black",
            marginTop: -40,
          }}
        ></Image>

        <Container style={styles.container}>
          <Content>
            <View style={{ height: 100 }}>
              <View style={{ flex: 3 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                    paddingStart: 5,
                    paddingEnd: 5,
                  }}
                >
                  {this.renderUsers(this.state.data)}
                </ScrollView>
              </View>
            </View>

            <View>{this.renderPosts(this.state.posts)}</View>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 15,
  },
});

export default Home;
