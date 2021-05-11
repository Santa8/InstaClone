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
  urlpost,
  
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
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
    </View>
  )
}

Post.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  urlpost: PropTypes.string,
  
}

Post.defaultProps = {
  containerStyle: {},
  urlpost: null,
  
}

export default Post
