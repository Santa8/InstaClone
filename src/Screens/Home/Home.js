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
} from "react-native";
import AuthStyle from "./AuthStyle";
import { connect } from "react-redux";

import axios from "axios";

import { Container, Content, Icon, Thumbnail } from "native-base";

import instalogo from "./insta.png";

import dm from "./dm.png";

import PostComponent from "./PostComponent";

import { isLogedIn } from "../../actions/AuthActions";
import User from "../../serveur/models/user.model";

import { listUsers } from "../../actions/followActions";

import { baseURL } from "../../constants";

class Home extends Component {
  list = [];

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      posts: [],
      Id: "",
    };
  }

  getIdValue = async () => {
    var value = await AsyncStorage.getItem("Id");
    this.Id = value;
    return value;
  };

  listUsers = () => {
    console.log("zzzz");
    console.log(baseURL);
    axios({
      method: "post",
      url: "/listUsers",
      baseURL: baseURL,
    })
      .then((res) => {
        //console.log(res.data.lista);

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
        console.log(res.data.totalPosts);

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
    console.log("dataaa");
    console.log(users);
    return users.map((user, index) => {
      return (
        <View>
          {/* <Thumbnail
                      style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                      source={require('./me.jpg')} /> */}

          <Text
            style={{
              marginHorizontal: 5,
              borderColor: "pink",
              borderWidth: 2,
              fontSize: 20,
            }}
          >
            {" "}
            {user.name}{" "}
          </Text>
          <Button
            title={user.follow ? "unfollow" : "follow"}
            style={{ marginHorizontal: 5, width: 10, height: 10 }}
            onPress={() => {
              console.log(user.Id);

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
                  //console.log(res.data.lista);

                  console.log(res.message);
                })

                .catch((err) => {
                  console.log(err.message);
                });
            }}
          />
        </View>
      );
    });
  };

  renderPosts = (posts) => {
    return posts.map((post, index) => {
      var name = post.username;
      var url = post.posts;

      return <PostComponent imageSource={url} likes="101" username={name} />;

      /* if(havePosts.length !=0){

         

          havePosts.forEach( post => {

            console.log(post.urlpost);

            return (
              <View>
              <PostComponent imageSource={post.urlpost} likes="101" username = {name}/> </View>
            );
            
          });

        }*/
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

            {/* <PostComponent imageSource="1" likes="101" />
                    <PostComponent imageSource="2" likes="201" />
                    <PostComponent imageSource="3" likes="301" /> */}
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
