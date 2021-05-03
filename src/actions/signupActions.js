import axios from 'axios';

// action types
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// action creators
export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  }
}
export const signupSuccess = signupData => {
  return {
    type: SIGNUP_SUCCESS,
    payload: signupData,
  }
}
export const signupFailure = errMsg => {
  return {
    type: SIGNUP_FAILURE,
    payload: errMsg,
  }
}

// async impure action creator enabled by redux-thunk
export const signup = (signupData)=> {
  
  return   dispatch => {
   dispatch(signupRequest());
    //const signupUri = 'http://localhost:3000/register';
       axios({
            method: 'post',
            url: '/register',
            baseURL: 'http://localhost:3000',
            data: { 
              name:signupData.name,
              username:signupData.username,
              email: signupData.email,
              password:signupData.password,
             
              }
          })
      .then(res => {
        const message=res.data.message;
        console.log("Status: ", res.status);
        console.log(res.data);
        if(message==='User added'){
          dispatch(signupSuccess(signupData));
        }
        else{
          console.log(message);
          dispatch(signupFailure(message));


        }
        
      })
      .catch(err => {
        console.log("signupActions.js, Signup Request Error: ", err.message);
        dispatch(signupFailure("Fail to Sign Up"));
      });
  }
}