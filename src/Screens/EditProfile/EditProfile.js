import React,{Component} from 'react';

import {View, Text,Image, Button,TextInput, StyleSheet,Alert,AsyncStorage} from 'react-native';
//import {AsyncStorage} from "@react-native-async-storage/async-storage"
//import {AsyncStorage} from "@react-native-community/async-storage"

import EditStyle from './EditStyle'
//mport { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
import {Item,Input} from 'native-base'
import { connect } from 'react-redux';
export const ImageProfil = require('./imagea.jpeg'); 
const styles = StyleSheet.create({ ...EditStyle})
import axios from'axios'
import { Icon } from 'native-base'

class EditProfile extends Component {

  constructor(props){
    super(props);
      this.state={
        name:"",
        username:"",
        website:"",
        bio:""
      }
      
  }


  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-pencil" style={{ color: tintColor }} />
    )
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
        
    })
    .catch(err=>console.log(err))
}
  /*async ComponentDidMount () {
     
  
    AsyncStorage.getItem('name').then((value)=> this.setState({'name':value}));
   
    AsyncStorage.getItem('username').then((value)=> this.setState({'username':value}));
    AsyncStorage.getItem('website').then((value)=> this.setState({'website':value}));
    AsyncStorage.getItem('bio').then((value)=> this.setState({'bio':value}));

}*/
componentWillMount () {
  this.fetchUserDetails(this.props.userDetails);

}
  
  saveEditProfile = () => {
      Alert.alert("Data is saved");
      this.props.navigation.navigate('Profile');
  }

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
                source={ImageProfil}
              />
              <View style={styles.changephoto}>
                  <Text style={styles.changeText } >Change Photo</Text>
              </View>
              <View style={styles.container}>
              
                   <View style={styles.item1}>
                           <Text >Name</Text>
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
 

 export default connect(mapStatetoProps) (EditProfile);
