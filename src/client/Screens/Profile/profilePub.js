import React, { Component } from "react";
import {
  Animated,
  Image,
  TextInput,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";

import AsyncStorage from "@react-native-community/async-storage";
//import { Icon } from 'react-native-elements'
import { uploadpost } from "../../actions/postsActions";
import PostComponent from "../Home/PostComponent";

import {
  TabView,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from "react-native-tab-view";
import PropTypes from "prop-types";
import { image } from "./utils";
import profileStyles from "./style/ProfileStyle";
export const ImageProfil = require("./images/photo_cv.jpg");
const styles = StyleSheet.create({ ...profileStyles });
import { Item, Input } from "native-base";
import Posts from "./Posts";
import { connect } from "react-redux";
import axios from "axios";
import { logout } from "../../actions/loginActions";
import { baseURL } from "../../constants";

import { Icon } from "native-base";

class ProfilePub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: this.props.authToken,
      id: "",
      name: "",
      url: false,
      description: "",
      username: "",
      urlpost: "",
      bio: "",
      ProfilePubId: "",
      posts: [],
      tabs: {
        index: 0,
        routes: [
          { key: "1", title: "Posts", count: "0" },
          { key: "2", title: "following", count: "0" },
          { key: "3", title: "followers", count: "0" },
        ],
      },
      postsMasonry: {},

      following: [],

      followers: [],

      isFollowing: false,
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{ color: tintColor }} />
    ),
  };

  getIsFollowing = (userId, followId) => {
    axios({
      method: "post",
      url: "/getIsFollowing",
      baseURL: baseURL,
      data: {
        userId: userId,
        followId: followId,
      },
    })
      .then((res) => {
        this.setState({ isFollowing: res.data.value });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchUserDetails = (user_id) => {
    axios({
      method: "post",
      url: "/getUserDetails",
      baseURL: baseURL,
      data: {
        userid: user_id,
      },
    })
      .then((res) => {
        this.setState({ name: res.data.results[0].name });

        if (res.data.results[0].url) {
          this.setState({ url: res.data.results[0].url });
        }
        this.setState({ username: res.data.results[0].username });
        this.setState({ bio: res.data.results[0].bio });

        const reversePosts = res.data.results[0].posts.reverse();

        this.setState({ posts: reversePosts });

        this.setState({ followers: res.data.results[0].followers });
        this.setState({ following: res.data.results[0].following });
        var followersnumber = this.state.followers.length;
        var followingnumber = this.state.following.length;
        var newroutes = [...this.state.tabs.routes];
        newroutes[0].count = this.state.posts.length;
        newroutes[1].count = followingnumber;
        newroutes[2].count = followersnumber;
        this.setState({
          tabs: {
            ...this.state.tabs,
            newroutes,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  onPressPlace = () => {
    console.log("place");
  };
  async componentDidMount() {
    await this.getIdValue();
    await this.getUserIdValue();
    this.fetchUserDetails(this.id);
    this.getIsFollowing(this.userId, this.id);

    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.fetchUserDetails(this.props.userDetails);
      }
    );
  }

  getIdValue = async () => {
    var value = await AsyncStorage.getItem("publicProfileId");

    this.id = value;
    return value;
  };

  getUserIdValue = async () => {
    var value = await AsyncStorage.getItem("Id");

    this.userId = value;
    return value;
  };

  componentDidUpdate() {
    if (this.props.isUploaded) {
      // Alert.alert("POST UPLOADED");
      this.props.navigation.navigate("Profile");
    }
    if (!this.props.isUploaded && !this.props.isLoading) {
      //Alert.alert(this.props.errMsg);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isUploaded !== this.props.isUploaded) {
      this.fetchUserDetails(this.props.userDetails);
    }
  }
  clearAppData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  };
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  handleIndexChange = (index) => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    });
  };

  renderTabBar = (props) => {
    return (
      <TabBar
        indicatorStyle={styles.indicatorTab}
        renderLabel={this.renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
        {...props}
      />
    );
  };

  renderLabel =
    (props) =>
    ({ route }) => {
      const routes = props.navigationState.routes;

      let labels = [];
      routes.forEach((e, index) => {
        labels.push(index === props.navigationState.index ? "black" : "gray");
      });

      const currentIndex = parseInt(route.key) - 1;
      const color = labels[currentIndex];

      return (
        <View>
          <Animated.Text style={[styles.tabLabelText, { color }]}>
            {route.count}
          </Animated.Text>
          <Animated.Text style={[styles.tabLabelNumber, { color }]}>
            {route.title}
          </Animated.Text>
        </View>
      );
    };

  ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

  ItemView = ({ item }) => {
    return (
      <View style={styles.followUser}>
        <View style={styles.itemUser}>
          <View style={styles.userRow}>
            <Image style={styles.followImage} source={{ uri: item.url }} />
          </View>
        </View>
        <View style={styles.itemUser2}>
          <View style={styles.userRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (item.Id) {
                  AsyncStorage.setItem("publicProfileId", item.name._id);
                  this.setState({ ProfilePubId: item.name._id });
                  this.props.navigation.navigate("ProfilePub");
                }
              }}
            >
              <Text>{item.nameVrai}</Text>
            </TouchableOpacity>
            <Text>{item.usernameVrai}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderPosts = (posts) => {
    return posts.map((post, index) => {
      var name = this.state.name;
      var url = post.urlpost;
      var caption = post.description;
      var date = post.date;
      var userpicurl = this.state.url ? this.state.url : false;
      var id = post.Id;

      return (
        <PostComponent
          key={id}
          imageSource={url}
          likes={post.likes.length}
          username={name}
          userid={this.userId}
          Id={id}
          userpicurl={this.state.url}
          caption={caption}
          date={date}
        />
      );
    });
  };

  renderScene = ({ route: { key } }) => {
    const { posts } = this.props;

    switch (key) {
      case "1":
        return this.renderMansonry2Col();
      case "2":
        return (
          <View>
            <FlatList
              data={this.state.following}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.ItemSeparatorView}
              renderItem={this.ItemView}
            />
          </View>
        );
      case "3":
        return (
          <View>
            <FlatList
              data={this.state.followers}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.ItemSeparatorView}
              renderItem={this.ItemView}
            />
          </View>
        );

      default:
        return <View />;
    }
  };

  following = () => {
    return this.state.following.map((user, index) => {
      return (
        <View>
          <Text> {user.name.username} </Text>
        </View>
      );
    });
  };

  followers = () => {
    return this.state.followers.map((user, index) => {
      return (
        <View>
          <Text> {user.name.username} </Text>
        </View>
      );
    });
  };

  followRequest = () => {
    axios({
      method: "post",
      url: "/follow",
      baseURL: baseURL,
      data: {
        Id: this.userId,

        followId: this.id,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        this.getIsFollowing(this.userId, this.id);
        this.fetchUserDetails(this.id);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };
  unfollowRequest = () => {
    axios({
      method: "post",
      url: "/unfollow",
      baseURL: baseURL,
      data: {
        Id: this.userId,

        followId: this.id,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        this.getIsFollowing(this.userId, this.id);
        this.fetchUserDetails(this.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  renderButton(text, color, onPress) {
    return (
      <View style={{ margin: SIZES.padding * 0.5, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 80,
            backgroundColor: color,
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

  renderContactHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View>
          <View style={{ marginLeft: 30, marginBottom: 20, marginTop: 20 }}>
            <Image style={styles.userImage} source={{ uri: this.state.url }} />
          </View>
        </View>

        <View>
          <View style={{ marginBottom: 5, marginLeft: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 5,
                  marginRight: 95,
                  fontWeight: "bold",
                }}
              >
                {this.state.name}
              </Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text>@{this.state.username}</Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text>{this.state.bio}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderMansonry2Col = () => {
    if (this.state.posts.length < 1) {
      return (
        <View>
          <Text>AUCUN POST </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.masonryContainer}>
          <View>
            <View>{this.renderPosts(this.state.posts)}</View>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={styles.cardContainer}>
            {this.renderContactHeader()}

            <TabView
              style={[styles.tabContainer, this.props.tabContainerStyle]}
              navigationState={this.state.tabs}
              renderScene={this.renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this.handleIndexChange}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    authToken: state.loginReducer.authToken,
    userDetails: state.loginReducer.userDetails,
    isLoading: state.postsReducer.isLoading,
    isUploaded: state.postsReducer.isUploaded,
    errMsg: state.postsReducer.errMsg,
    ProfilePubId: state.ProfilePubId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    logout: () => dispatch(logout()),
    uploadpost: (Data) => dispatch(uploadpost(Data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ProfilePub);
