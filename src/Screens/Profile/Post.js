import React from "react";
import {
  Image,
  Dimensions,
  Text,
  Button,
  StyleSheet,
  View,
} from "react-native";
import PropTypes from "prop-types";
export const ImageProfil = require("./images/imagea.jpeg");
import axios from "axios";
import { baseURL } from "../../constants";

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    justifyContent: "space-between",
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    padding: 0,
  },
  date: {
    color: "gray",
    fontSize: 12.5,
  },
  postRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    width: Dimensions.get("window").width * 1,
  },
  postImage: {
    backgroundColor: "rgba(0, 0, 0, 0.075)",
    height: 500,
  },
  userImage: {
    marginRight: 12,
  },
  wordRow: {
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  wordText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
  },
});

function ModifyPost(urlpost, description, userid, Id) {
  /*swal({
    title: "Modify Post:",
    text: "Description",
    icon: urlpost,
    content: {
      element: "input",
      attributes: {
        value: description,
        type: "Description",
      },
    },
    button: {
      text: "Update",
      closeModal: false,
    },
  }).then((description) => {
    axios({
      method: "post",
      url: "/UpdatePost",
      baseURL: baseURL,
      data: {
        userid: userid,
        postid: Id,
        description: description,
      },
    })
      .then((res) => {
        //console.log(res)
        const message = res.data.message;
        console.log(message);
        if (res.data.value) {
          //swal(message);
        }
      })
      .catch((err) => console.log(err));
  });*/
}

function DeletePost(urlpost, userid, Id) {
  /*swal({
    title: "Delete the post?",
    text: "",
    icon: urlpost,
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    axios({
      method: "post",
      url: "/DeletePost",
      baseURL: baseURL,
      data: {
        userid: userid,
        postid: Id,
      },
    })
      .then((res) => {
        //console.log(res)
        const message = res.data.message;
        console.log(message);
        if (res.data.value) {
          swal(message);
        }
      })
      .catch((err) => console.log(err));
    if (willDelete) {
      swal("Your post has been deleted!", { icon: "success" });
    } else {
      swal("Your post has not been deleted");
    }
  });*/
}

const Post = ({ containerStyle, Id, urlpost, description, date, userid }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.postRow}></View>

      {urlpost && (
        <Image style={[styles.postImage]} source={{ uri: urlpost }} />
      )}
      <View style={styles.wordRow}>
        <View>
          <Text style={styles.wordText}>Description: {description}</Text>
          <Text style={styles.wordText}>Date de publication :{date}</Text>
        </View>

        <Button
          onPress={() => ModifyPost(urlpost, description, userid, Id)}
          title="Modify post"
        />

        <Button
          onPress={() => DeletePost(urlpost, userid, Id)}
          title="Delete post"
        />
      </View>
    </View>
  );
};

Post.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  Id: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  urlpost: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  userid: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

Post.defaultProps = {
  containerStyle: {},
  Id: null,
  urlpost: null,
  description: null,
  date: null,
  userid: null,
};

export default Post;
