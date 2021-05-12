



import React, { Component } from 'react'
import { Animated,Image,TextInput, Button, ScrollView,Alert ,StyleSheet,Text,View,AsyncStorage} from 'react-native';

//import {AsyncStorage} from "@react-native-community/async-storage"
//import { Icon } from 'react-native-elements'
import {uploadpost} from '../../actions/postsActions';

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
        username:"",
        urlpost:"",
        bio:"",
        post:"",
        posts:[],
        tabs: {
          index: 0,
          routes: [
            
            { key: '1', title: 'Posts', count: 2},
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
        this.setState({posts:res.data.results[0].posts});

        console.log(res.data.results[0].following);

        this.setState({followers:res.data.results[0].followers});
        this.setState({following:res.data.results[0].following});
          this.ModifyNumber();
        //console.log(this.state.profileimage);
    })
    .catch(err=>console.log(err))
}
ModifyNumber= () => {

  let routes = [...this.state.tabs.routes];
  
  let tab = {
    ...routes[1],
    count: this.state.posts.length
}
routes[1]=tab;

this.setState({tabs});

}

UploadPost = () => {

  const Data = {
   id:this.props.userDetails,
   urlpost: this.state.urlpost
    
  }
  // calling signup() dispatch
  
  this.props.uploadpost(Data);
}
/*ComponentDidMount () {
  console.log('dkhaaaal'); 
    this.fetchUserDetails(this.props.userDetails);

    //AsyncStorage.getItem('name').then((value)=> this.setState({'name':value}));
   
     //AsyncStorage.getItem('username').then((value)=> this.setState({'username':value}));
    //AsyncStorage.getItem('website').then((value)=> this.setState({'website':value}));
    //AsyncStorage.getItem('bio').then((value)=> this.setState({'bio':value}));

  }*/


/*useEffect(() => {
  setTimeout(() => {
    props.navigation.navigate(props.authToken ? 'App' : 'Auth');
  }, 2000);
}, []);*/



    /*static propTypes = {
        
        bio: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
        
      }

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  }*/

  /*stat = {
    tabs: {
      index: 0,
      routes: [
        
        { key: '1', title: 'Posts', count: 2},
        { key: '2', title: 'following', count: '192 M' },
        { key: '3', title: 'followers', count: '83' },
      ],
    },
    postsMasonry: {},
  }
*/
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
  /*componentWillMount() {
    this.setState({
      //postsMasonry: image.mansonry(this.state.posts, 'imageHeight'),
    })
  }*/

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
    <TextInput style={styles.TextInputurl} style={{ height: 30, marginTop: 10 , marginBottom: 10 , marginRight:1}}
                    placeholder="urlpost"
                    onChangeText={ text => this.setState({urlpost: text})}
                    value={this.state.urlpost} 
                /> 
                
                <Button
                onPress={this.UploadPost }
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
    return (
      <View style={styles.masonryContainer}>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
           // posts={this.state.postsMasonry.leftCol}
           posts={this.state.posts}
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

/*const mapStatetoProps=(state)=>{
  return{
    // id: state.loginReducer.authToken.id,
      
  }
 }*/
 
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
