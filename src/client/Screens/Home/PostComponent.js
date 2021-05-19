import React, { Component, TouchableOpacity } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { baseURL } from "../../constants";

import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon,
} from "native-base";
import axios from "axios";

class PostComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userpicurl:
        "https://i.pinimg.com/280x280_RS/b8/49/79/b849797ed8b78c6d2d8ab6db464d61fe.jpg",

      isLiking : false,

      likes : this.props.likes
    };
  }

  like = ()=> {
    axios({
      method: "post",
      url: "/like",
      baseURL: baseURL,
      data: {
        Id: this.props.Id,
        userid : this.props.userid

      },
    })
    .then((res) => {
      const message = res.data.message;

      if (res.data.value) {
        console.log(message)
        this.getIsLiking()
        var old = this.state.likes;
        var neww = old +1 ;
        this.setState({likes : neww })
      }
    })
    .catch((err) => console.log(err));
  }

  unlike = () => {
    axios({
      method: "post",
      url: "/unlike",
      baseURL: baseURL,
      data: {
        Id: this.props.Id,
        userid : this.props.userid

      },
    })
    .then((res) => {
      const message = res.data.message;

      if (res.data.value) {
        console.log(message)
        this.getIsLiking()
        var old = this.state.likes;
        var neww = old -1 ;
       this.setState({likes : neww })

      }
    })
    .catch((err) => console.log(err));
  }
  DisplayLikes( postid,displaylikes, navigation) {
    const data = {
       postid: postid,
    };
   
    displaylikes(data);
    navigation.navigate("LikesPage");
  }
  
  getIsLiking = () => {
    axios({
      method: "post",
      url: "/getIsLiking",
      baseURL: baseURL,
      data: {
        Id: this.props.Id,
        userid : this.props.userid

      },
    })
    .then((res) => {
      const message = res.data.message;

      this.setState({isLiking : res.data.value })
    })
    .catch((err) => console.log(err));


  }

  check = () => {
    if (this.props.userpicurl) {
      this.setState({ userpicurl: this.props.userpicurl });
    }
  };
  componentDidMount() {
    this.check();
    this.getIsLiking();
    this.setState({likes : this.props.likes})
  }
  render() {
    let onpress = this.state.isLiking ? this.unlike : this.like;
    let typebutton = this.state.isLiking ? "ios-heart-circle-sharp" : "ios-heart-outline";
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: this.state.userpicurl,
              }}
            />

            <Body>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#2a9d8f",
                }}
              >
                {this.props.username}
              </Text>
              <Text style={{ color: "#ffcdb2" }}>
                {" "}
                {this.props.date.substring(0, 10)}
              </Text>
            </Body>
          </Left>

        </CardItem>
        <Button
        onPress={() =>
                this.DisplayLikes(                 
                  this.props.Id,
                  this.props.displaylikes,
                  this.props.navigation                
                )
              }>
                <Text>LIKES</Text>
        </Button>

        <CardItem cardBody>
          <Image
            source={{ uri: this.props.imageSource }}
            style={{ height: 300, width: 300, flex: 1 }}
          />
        </CardItem>
        <CardItem style={{ height: 45 }}>
          <Left>
            
          <Icon
               onPress={ onpress } 
              name={typebutton}  style={{ color: "black" }} />
            
            <Button transparent>
              <Icon name="ios-chatbubbles-outline" style={{ color: "black" }} />
            </Button>
            <Button transparent>
              <Icon name="ios-send-outline" style={{ color: "black" }} />
            </Button>
          </Left>
        </CardItem>

        <CardItem style={{ height: 20 }}>
          <Text>{this.state.likes} </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#2a9d8f",
                }}
              >
                {this.props.username}
              </Text>
              {"  "}

              {this.props.caption}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
export default PostComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
