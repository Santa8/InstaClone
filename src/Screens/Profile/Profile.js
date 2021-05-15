



import React, { Component } from 'react'
import { Animated,Image,TextInput, Button, ScrollView,Alert ,StyleSheet,Text,View,AsyncStorage} from 'react-native';

//import {AsyncStorage} from "@react-native-community/async-storage"
//import { Icon } from 'react-native-elements'
import {uploadpost} from '../../actions/postsActions';
import swal from 'sweetalert';

import {
  TabView,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from 'react-native-tab-view'
import PropTypes from 'prop-types'
import { image } from './utils'
import profileStyles from './ProfileStyle'
export const ImageProfil = require('./images/photo_cv.jpg'); 
const styles = StyleSheet.create({ ...profileStyles })
import {Item,Input} from 'native-base'
import Posts from './Posts'
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import axios from'axios'
import { logout } from '../../actions/loginActions';



import {Icon } from 'native-base'

 
class Profile extends Component {

  constructor(props){
    super(props);
      this.state={
        authToken:this.props.authToken,  
        id:this.props.userDetails,
        name:"",
        url:"",
        description:"",
        username:"",
        urlpost:"",
        bio:"",
        post:"",
        posts:[],
        tabs: {
          index: 0,
          routes: [
            
            { key: '1', title: 'Posts', count: '5'},
            { key: '2', title: 'following', count: '192 M' },
            { key: '3', title: 'followers', count: '83' },
          ],
        },
        postsMasonry: {},

        following : [],

        followers : []
        
      }
      
  }


  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" style={{ color: tintColor }} />
    )
  }

  fetchUserDetails= (user_id)=> {
    console.log('dkhaaaal');
    console.log(user_id);
   /*axios.post("http://localhost:3000/getUserDetails",{
  params: {
    userid: user_id
  }})*/
  axios({
    method: 'post',
    url: '/getUserDetails',
    baseURL: 'http://localhost:3000',
    data: { 
      userid: user_id
     
      }
  })
    .then(res=>{
        console.log(res);
        this.setState({name:res.data.results[0].name});
        this.setState({url:res.data.results[0].url});
        this.setState({username:res.data.results[0].username});
        this.setState({bio:res.data.results[0].bio});
        this.setState({post:res.data.results[0].posts[0].urlpost});
        

        const reversePosts=res.data.results[0].posts.reverse();

        this.setState({posts:reversePosts});

        this.setState({followers:res.data.results[0].followers});
        this.setState({following:res.data.results[0].following});
        var followersnumber=this.state.followers.length;
        var followingnumber=this.state.following.length;
        var newroutes=[...this.state.tabs.routes];
        newroutes[0].count=this.state.posts.length-1;
        newroutes[1].count=followingnumber;
        newroutes[2].count=followersnumber;
        this.setState({
          tabs: {
            ...this.state.tabs,
            newroutes,
          },
        })
        
        
        
    })
    .catch(err=>console.log(err))
}
ModifyNumber= (tabs) => {

       var newtabs=[...tabs];
       console.log(newtabs)
       var newroutes=[...newtabs.routes];
        var newroute=[...newroutes[0]];
        newroute.count=reversePosts.length;
        this.setState({tabs:newtabs});

}

Upload =() => {

  swal({
    
    title: 'Upload Post',
    text: "Url",    
    content: {
      element: "input",
      attributes: {
        value:"Url",
        type: "Url",
      },
    },
    button: {
      text: "Upload",
      closeModal: false,
    },
  })
  
  .then((Url) => {
     const url = Url;

    swal({
    
      title: 'UploadPost:',
      text: "Description",    
      icon:Url,
      content: {
        element: "input",
        attributes: {
          value:"",
          type: "Description",
        },
      },
      button: {
        text: "Upload",
        closeModal: false,
      },
    })
    .then((Description) => {
      const description=Description
      axios({
        method: 'post',
        url: '/uploadpost',
        baseURL: 'http://localhost:3000',
        data: { 
          id:this.state.id,
          urlpost:url,
          description:description,
          date:new Date().toISOString()

          }
      })
      
    .then(res=>{
           
      
      const message=res.data.message;
      console.log(message)
      if(res.data.value){
        
        swal(message);
        
      }
      
  })
  .catch(err=>console.log(err))

    })

})  
     
    }


 
  
  


/*UploadPost = () => {

  const Data = {
   id:this.props.userDetails,
   urlpost: this.state.urlpost,
   description:this.state.description,
   date:new Date().toISOString()
    
  }
  // calling signup() dispatch
  
  this.props.uploadpost(Data);
}*/


  onPressPlace = () => {
    console.log('place')
  }
  componentDidMount () {
    
    this.fetchUserDetails(this.props.userDetails);
   
   
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetchUserDetails(this.props.userDetails);
        
      }
    );
  }

  componentDidUpdate() {
    if (this.props.isUploaded) {
      Alert.alert('POST UPLOADED');
      this.props.navigation.navigate('Profile');
    }
     if (!this.props.isUploaded && !this.props.isLoading) {
      Alert.alert(this.props.errMsg);
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.isUploaded !== this.props.isUploaded) {
      console.log('bibi')
      this.fetchUserDetails(this.props.userDetails);
    }
  }

  componentWillUnmount() {
   
    this.willFocusSubscription.remove();
  } 

  

  LogOut = () =>{
    this.props.logout();
     this.props.navigation.navigate('LogIn');
  }
  handleIndexChange = index => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    })
  }

  renderTabBar = props => {
    return <TabBar
      indicatorStyle={styles.indicatorTab}
      renderLabel={this.renderLabel(props)}
      pressOpacity={0.8}
      style={styles.tabBar}
      {...props}
    />
  };

  renderLabel = props => ({ route }) => {
    const routes = props.navigationState.routes

    let labels = []
    routes.forEach((e, index) => {
      labels.push(index === props.navigationState.index ? 'black' : 'gray')
    })

    const currentIndex = parseInt(route.key) - 1
    const color = labels[currentIndex]

    return (
      <View>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  renderScene = ({ route: { key } }) => {
    const { posts } = this.props

    switch (key) {
        case '1':
            return this.renderMansonry2Col()
        case '2':
          return  <View> <ScrollView>  {this.following()} </ScrollView> </View>
        case '3':
          return  <View> <ScrollView>  {this.followers()} </ScrollView> </View>
      
      default:
        return <View />
    }
  }


  following = () => {


    return this.state.following.map((user,index) => {
      return (

        <View>   
       
        <Text>  {user.name.username}  </Text> </View>
            
        
                
      );
    });

  }


  followers = () => {


    return this.state.followers.map((user,index) => {
      return (

        <View>   
       
        <Text>  {user.name.username}  </Text> </View>
            
        
                
      );
    });

  }
 


 
  renderContactHeader = () => {
    //const { avatar, name, bio } = this.props

    return (
      <View style={styles.headerContainer}>
        
        <View style={styles.item}>
        <View style={styles.userRow}>
              <Image
                style={styles.userImage}
                source={{uri:this.state.url}}
              />
             </View>
             
          </View>
          
          <View style={styles.item2}>
            <View style={{ height: 70, marginTop: 10 , marginRight:50}}>
            <Button
          title="logout" 
          onPress={this.LogOut} 
        />
           { /*<Button
          title="Edit Profile" 
          onPress={() => this.props.navigation.navigate('EditProfile')} 
        />*/}
             
    </View>
    
    <View style={styles.userRow} >
    {/*<TextInput style={styles.TextInputurl} style={{ height: 30, marginTop: 10 , marginBottom: 10 , marginRight:1}}
                    placeholder="urlpost"
                    onChangeText={ text => this.setState({urlpost: text})}
                    value={this.state.urlpost} 
                /> 

<TextInput style={styles.TextInputurl} style={{ height: 30, marginTop: 10 , marginBottom: 10 , marginRight:1}}
                    placeholder="Description"
                    onChangeText={ text => this.setState({description: text})}
                    value={this.state.description} 
                />   */}         
                
                <Button
                onPress={this.Upload }
                   title="upload post"  
                />  
    </View>
          <View style={styles.userRow}>
               
               
                
                 <View style={styles.userNameRow}>
                 
                      <Text style={styles.userNameText}>{this.state.name}</Text>
                  </View>
                  <View style={styles.userNameRow}>
                 
                      <Text style={styles.userNameText}>@{this.state.username}</Text>
                      
                  </View>
                  <View style={styles.userBioRow}>
                       <Text style={styles.userBioText}>{this.state.bio}</Text>
                        
                   </View>
              </View>
          </View> 
      </View>
      
    )
  }
  
  renderMansonry2Col = () => {
    
     if(this.state.posts.length < 2 ){
          return(
            <View><Text>AUCUN POST </Text></View>
          )
    }
    else {
    return (
      <View style={styles.masonryContainer}>
        <View>
        
          <Posts
            containerStyle={styles.sceneContainer}
           // posts={this.state.postsMasonry.leftCol}
           posts={this.state.posts}
           userid={this.state.id}
          />
        </View>
        {/*<View>
          <Posts
            containerStyle={styles.sceneContainer}
            //posts={this.state.postsMasonry.rightCol}
          />
        </View>*/}
      </View>
    )
      }
    
  }


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
    )
  }
}


 
 const mapStatetoProps=(state)=>{
  return{
    authToken: state.loginReducer.authToken,
    userDetails: state.loginReducer.userDetails,
    isLoading: state.postsReducer.isLoading,
    isUploaded: state.postsReducer.isUploaded,
    errMsg: state.postsReducer.errMsg,
   
  }
 }
 const mapDispatchToProps = dispatch => {
  return {
    // only map needed dispatches here
    logout: () => dispatch(logout()),
    uploadpost: Data => dispatch(uploadpost(Data)),
  }
}
 

 export default connect(mapStatetoProps,mapDispatchToProps) (Profile);
