import axios from "axios";
import { baseURL } from "../constants";

// action types
export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";
export const EDIT_POST = "EDIT_POST";
export const MODIFY_POST = "MODIFY_POST";
// action creators
export const uploadRequest = () => {
  return {
    type: UPLOAD_REQUEST,
  };
};
export const editPost = (postdata) => {
  return {
    type: EDIT_POST,
    payload: postdata,
  };
};
export const modifyPost = (postdata) => {
  return {
    type: MODIFY_POST,
    payload: postdata,
  };
};
export const uploadSuccess = (signupData) => {
  return {
    type: UPLOAD_SUCCESS,
    payload: signupData,
  };
};
export const uploadFailure = (errMsg) => {
  return {
    type: UPLOAD_FAILURE,
    payload: errMsg,
  };
};

// async impure action creator enabled by redux-thunk
export const uploadprofilephoto = (Data) => {
  return (dispatch) => {
    dispatch(uploadRequest());
    //const signupUri = 'http://localhost:3000/register';
    axios({
      method: "post",
      url: "/uploadprofilephoto",
      baseURL: baseURL,
      data: {
        id: Data.userid,
        url: Data.urlpost,
      },
    })
      .then((res) => {
        const message = res.data.message;
        if (message === "POST UPLOADED") {
          dispatch(uploadSuccess(Data));
        } else {
          dispatch(uploadFailure(message));
        }
      })
      .catch((err) => {
        console.log("postsActions.js, upload Request Error: ", err.message);
        dispatch(uploadFailure("Fail to Upload"));
      });
  };
};

export const editpost = (postdata) => {
  return (dispatch) => {
    console.log("hna");
    console.log(postdata);
    dispatch(editPost(postdata));
  };
};

export const modifypost = (postdata) => {
  const postdataa = postdata;
  console.log(postdataa.postid);
  return (dispatch) => {
    dispatch(modifyPost(postdataa));
    axios({
      method: "post",
      url: "/UpdatePost",
      baseURL: baseURL,
      data: {
        userid: postdataa.userid,
        postid: postdataa.postid,
        description: postdataa.description,
      },
    })
      .then((res) => {
        //console.log(res)
        const message = res.data.message;

        if (res.data.value) {
          console.log(message);
        }
      })
      .catch((err) => console.log(err));
  };
};
