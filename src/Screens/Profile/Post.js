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
//import swal from "sweetalert";
import axios from "axios";

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
  })
    .then((description) => {
      axios({
        method: "post",
        url: "/UpdatePost",
        baseURL: "http://localhost:3000",
        data: {
          userid: userid,
          postid: Id,
          description: description,
        },
      });
    })
    .then((res) => {
      //console.log(res.message)
      //const message=res.message;

      //if(message==='POST UPDATED'){

      swal("Post updated");

      //}
    })
    .catch((err) => console.log(err));*/
}
const Post = ({ containerStyle, Id, urlpost, description, date, userid }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.postRow}></View>

      {urlpost && (
        <Image style={[styles.postImage]} source={{ uri: urlpost }} />
      )}
      <View style={styles.wordRow}>
        <Text style={styles.wordText}>{description}</Text>
        <Text style={styles.wordText}>{userid}</Text>
        <Text style={styles.wordText}>{Id}</Text>
        <Text style={styles.wordText}>{date}</Text>
        <Button
          onPress={() => ModifyPost(urlpost, description, userid, Id)}
          title="Modify post"
        />
      </View>
    </View>
  );
  /*<View style={[styles.container, containerStyle]}>
      { urlpost&& (
        <Image
          style={[
            styles.postImage,
            {
              width: 500*0.5,
              height: 500 * (500/ 500)*0.5,
            },
          ]}
          source={{uri: urlpost}}
        />
      )}
    </View>*/
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
