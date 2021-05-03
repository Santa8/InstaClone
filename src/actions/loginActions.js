import axios from 'axios';
//import store from '../../../Store';
const jwt = require('jsonwebtoken');
// action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER ='LOGOUT_USER';

// action creators
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  }
}
export const loginSuccess = loginData => {
  return {
    type: LOGIN_SUCCESS,
    payload: loginData,
  }
}

export const loginFailure = errMsg => {
  return {
    type: LOGIN_FAILURE,
    payload: errMsg,
  }
}

// save the auth token to redux store
export const setAuthToken = authToken => {
  return {
    type: SET_AUTH_TOKEN,
    payload: authToken,
  }
}
export const setCurrentUser =(userId)=>{

  return{
      type:SET_CURRENT_USER,
      payload:userId
  }

}

export const logout=()=>{

  return function(dispatch){
       localStorage.removeItem('jwtToken');
      // setAuthenticationToken(false);
      delete axios.defaults.headers.common['Authorization'];
       dispatch(setCurrentUser({}))

       dispatch({
           type:LOGOUT_USER
          })
     window.location.href="/";
  }
}


// async impure action creator enabled by redux-thunk
export const login = loginData => {
  return dispatch => {
    dispatch(loginRequest());
    //const loginUri = 'http://localhost:3000/login';
    axios({
        method: 'post',
        url: '/login',
        baseURL: 'http://localhost:3000',
        data: { 
          email: loginData.email,
          password:loginData.password,        
          }
      })
    
      .then(res => {
        console.log("loginAction.js, Status: ", res.status);
        console.log(res.data);
        const message=res.data.message;
        if(message==='User Found'){
          console.log(res.data.user);
          console.log(message);
          /*var token =res.data.token;
          localStorage.setItem("jwtToken",token);
          if(token){
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
          }else{
              delete axios.defaults.headers.common['Authorization'];
          }*/
        //setAuthenticationToken(token);
       // console.log(jwt.decode(token));
         
            dispatch(loginSuccess(loginData));
            dispatch(setCurrentUser(res.data.id));
             //save the auth token
            // const authToken = res.headers['auth-token'];
             dispatch(setAuthToken(res.data.token));
          }
          else{
            console.log(message);
            dispatch(loginFailure (message));
  
  
          }
          
        })
        
      .catch(err => {
        dispatch(loginFailure("User Not Found!"));
        console.log("loginAction.js, Request Error: ", err.message);
      });
  }
}