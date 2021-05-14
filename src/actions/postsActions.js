import axios from 'axios';

// action types
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

// action creators
export const uploadRequest = () => {
  return {
    type: UPLOAD_REQUEST,
  }
}
export const uploadSuccess = signupData => {
  return {
    type: UPLOAD_SUCCESS,
    payload: signupData,
  }
}
export const uploadFailure = errMsg => {
  return {
    type: UPLOAD_FAILURE,
    payload: errMsg,
  }
}

// async impure action creator enabled by redux-thunk
export const uploadprofilephoto = (Data)=> {
  
  return   dispatch => {
   dispatch(uploadRequest());
    //const signupUri = 'http://localhost:3000/register';
       axios({
            method: 'post',
            url: '/uploadprofilephoto',
            baseURL: 'http://localhost:3000',
            data: { 
              id:Data.id,  
              url:Data.url
              
             
              }
          })
      .then(res => {
        const message=res.data.message;
        console.log("Status: ", res.status);
        console.log(res.data);
        if(message==='POST UPLOADED'){

          dispatch(uploadSuccess(Data));
        }
        else{
          console.log(message);
          dispatch(uploadFailure(message));


        }
        
      })
      .catch(err => {
        console.log("postsActions.js, upload Request Error: ", err.message);
        dispatch(uploadFailure("Fail to Upload"));
      });
  }
}
export const uploadpost = (Data)=> {
  
  return   dispatch => {
   dispatch(uploadRequest());
    //const signupUri = 'http://localhost:3000/register';
       axios({
            method: 'post',
            url: '/uploadpost',
            baseURL: 'http://localhost:3000',
            data: { 
              id:Data.id,  
              urlpost:Data.urlpost,
              description:Data.description,
              date:Data.date,
              
             
              }
          })
      .then(res => {
        const message=res.data.message;
        console.log("Status: ", res.status);
        console.log(res.data);
        if(message==='POST UPLOADED'){

          dispatch(uploadSuccess(Data));
        }
        else{
          console.log(message);
          dispatch(uploadFailure(message));


        }
        
      })
      .catch(err => {
        console.log("postsActions.js, upload Request Error: ", err.message);
        dispatch(uploadFailure("Fail to Upload"));
      });
  }
}