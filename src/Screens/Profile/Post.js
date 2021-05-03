import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
export const ImageProfil = require('./images/imagea.jpeg'); 
const styles = StyleSheet.create({
  container: {},
  postImage: {},
})

const Post = ({
  containerStyle,
  image,
  imageHeight,
  imageWidth,
  postWidth,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {image && (
        <Image
          style={[
            styles.postImage,
            {
              width: postWidth*0.5,
              height: postWidth * (imageHeight / imageWidth)*0.5,
            },
          ]}
          source={ImageProfil }
        />
      )}
    </View>
  )
}

Post.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  image: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  postWidth: PropTypes.number,
}

Post.defaultProps = {
  containerStyle: {},
  image: null,
  imageHeight: null,
  imageWidth: null,
  postWidth: null,
}

export default Post
