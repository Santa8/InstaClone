


import React,{Component} from 'react';

import {View, Text,Image, Button,TextInput, StyleSheet,Alert,AsyncStorage} from 'react-native';
//import { launchImageLibrary} from 'react-native-image-picker';
//import {AsyncStorage} from "@react-native-async-storage/async-storage"
//import {AsyncStorage} from "@react-native-community/async-storage"
//var ImagePicker = require('react-native-image-picker');
import EditStyle from './EditStyle'
//mport { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
import {Item,Input} from 'native-base'
import { connect } from 'react-redux';
export const ImageProfil = require('./imagea.jpeg'); 
const styles = StyleSheet.create({ ...EditStyle})
import axios from'axios'
import {uploadprofilephoto} from '../../actions/postsActions';


import {Icon } from 'native-base'



class EditProfile extends Component {

  constructor(props){
    super(props);
      this.state={
        name:"",
        username:"",
        website:"",
        bio:"",
        url:"",

      }
      
  }

  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-pencil" style={{ color: tintColor }} />
    )
  }
 
 UploadProfilePhoto = () => {

        const Data = {
         id:this.props.userDetails,
         url: this.state.url
          
        }
        // calling signup() dispatch
        
        this.props.uploadprofilephoto(Data);
      }

  saveEditProfile = () => {
    
    if(!this.state.name ){
      Alert.alert("Name is empty");
    }
    else if( !this.state.username){
      Alert.alert("Username is empty");
    }
    else{
    axios({
      method: 'post',
      url: '/EditProfile',
      baseURL: 'http://localhost:3000',
      data: { 
        userid:this.props.userDetails,
        name:this.state.name,
        username:this.state.username,
        website:this.state.website,
        bio:this.state.bio

       
        }
    })
      .then(res=>{
         
          Alert.alert("Data is saved");
          console.log(res);
          const message=res.data.message;
  
          if(message==='Profile updated succefully'){
            this.props.navigation.navigate('Profile');
            Alert.alert(message);
            
  
          }
          
      })
      .catch(err=>console.log(err))
       
    }
      
  }
  
  fetchUserDetails= (user_id)=> {
   
  
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
        this.setState({username:res.data.results[0].username});
        this.setState({bio:res.data.results[0].bio});
        this.setState({website:res.data.results[0].website});
        this.setState({url:res.data.results[0].url});
        
    })
    .catch(err=>console.log(err))
}
  /*async ComponentDidMount () {
     
  
    AsyncStorage.getItem('name').then((value)=> this.setState({'name':value}));
   
    AsyncStorage.getItem('username').then((value)=> this.setState({'username':value}));
    AsyncStorage.getItem('website').then((value)=> this.setState({'website':value}));
    AsyncStorage.getItem('bio').then((value)=> this.setState({'bio':value}));

}*/

componentDidMount () {
  this.fetchUserDetails(this.props.userDetails);
  this.willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    () => {
      this.fetchUserDetails(this.props.userDetails);
    }
  );

}
/*componentWillMount() {
  this.fetchUserDetails(this.props.userDetails);
  this.willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    () => {
      this.fetchUserDetails(this.props.userDetails);
    }
  );
} */
componentWillUnmount() {
  this.willFocusSubscription.remove();
} 
  
  

  ChangePhoto = () => {

    /*const options ={
      noData: true,
    };

  launchImageLibrary(options,response => {

      console.log("response",response);
      if(response.uri){
        this.setState({photo:response});
      }
    })*/  
  }
   /*ChangePhoto = () => {
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({photo:response.uri});
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        console.log(source)
      }
  }
    )} */
 /* setName = (value) => {
    AsyncStorage.setItem('name',value);
    this.setState({'name':value});
  }

  setUsername = (value) =>{
     AsyncStorage.setItem('username',value);
    this.setState({'username':value});
  }

  setWebsite = (value) =>{
     AsyncStorage.setItem('website',value);
    this.setState({'website':value});
  }

  setBio = (value) =>{
      AsyncStorage.setItem('bio',value);
    this.setState({'bio':value});
  }*/
      
  

    render() {

      return (

      <View style={styles.headerContainer}>
        
       
        <View style={styles.userRow}>
              <Image
                style={styles.userImage}
                source={{uri:this.state.url}}
              />
              <View style={styles.changephoto}>
                
              <TextInput style={styles.TextInput}
                    placeholder="urlprofile"
                    onChangeText={ text => this.setState({url: text})}
                    value={this.state.url} 
                /> 
                
                <Button
                onPress={this.UploadProfilePhoto }
                   title="upload url"  
                />      
              </View>

              <View style={styles.container}>
              
                   <View style={styles.item1}>
                           <Text>Name</Text>
                    </View>  
                    <View  regular style={styles.item2}>
                        <TextInput style={styles.TextInput} 
                        value={this.state.name}
                         onChangeText={ text => this.setState({name: text})}  
                          autoCapitalize='none'/>
                    </View>
                  
                    <View style={styles.item1}>
                           <Text >Username</Text>
                    </View>  
                    <View  regular style={styles.item2}>
                        <TextInput style={styles.TextInput} 
                        value={this.state.username} 
                        onChangeText={ text => this.setState({username: text})}    autoCapitalize='none' />
                        </View>

                    <View style={styles.item1}>
                           <Text >Website</Text>
                      </View> 
                    <View  regular style={styles.item2}>
                        <TextInput style={styles.TextInput}
                         value={this.state.website}
                         onChangeText={ text => this.setState({website: text})}    autoCapitalize='none' />
                        </View>
                    <View style={styles.item1}>
                           <Text >Bio</Text>
                    </View>  
                    <View regular style={styles.item2}>
                        <TextInput style={styles.TextBioInput}
                         value={this.state.bio} onChangeText={ text => this.setState({bio: text})}     autoCapitalize='none' />
                    </View>
                    
                     
                       
                    
                    
              </View>
             
              <Button  title="Save" onPress={this.saveEditProfile} />    
              </View> 

              
      </View>
          


      )
    }

}
const mapStatetoProps=(state)=>{
  return{
    
    userDetails: state.loginReducer.userDetails,
   
  }
 }
 

 const mapDispatchToProps = dispatch => {
  return {
    // only map needed dispatches here
    uploadprofilephoto: Data => dispatch(uploadprofilephoto(Data)),
  }
}



 
export default connect(mapStatetoProps, mapDispatchToProps)(EditProfile);