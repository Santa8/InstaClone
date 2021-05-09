import axios from "axios";
//import store from '../../../Store';
const jwt = require("jsonwebtoken");
import deviceStorage from "./deviceStorege";

// action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOGOUT_USER = "LOGOUT_USER";

// action creators
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
export const loginSuccess = (loginData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: loginData,
  };
};

export const loginFailure = (errMsg) => {
  return {
    type: LOGIN_FAILURE,
    payload: errMsg,
  };
};

// save the auth token to redux store
export const setAuthToken = (authToken) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: authToken,
  };
};
export const setCurrentUser = (userId) => {
  return {
    type: SET_CURRENT_USER,
    payload: userId,
  };
};

export const logout = () => {
  return function (dispatch) {
    localStorage.removeItem("jwtToken");
    // setAuthenticationToken(false);
    delete axios.defaults.headers.common["Authorization"];
    dispatch(setCurrentUser({}));

    dispatch({
      type: LOGOUT_USER,
    });
    window.location.href = "/";
  };
};

// async impure action creator enabled by redux-thunk
export const login = (loginData) => {
  return (dispatch) => {
    dispatch(loginRequest());
    //const loginUri = 'http://localhost:3000/login';
    axios({
      method: "post",
      url: "/login",
      baseURL: "http://localhost:3000",
      data: {
        email: loginData.email,
        password: loginData.password,
      },
    })
      .then((res) => {
        if (res.data.value) {
          dispatch(loginSuccess(res.data));
        } else {
          swal({
            title: res.data.message,
            //text: ,
            icon: "warning",
          });
          dispatch(loginFailure(res.data.message));
        }
      })

      .catch((err) => {
        console.log(err.message);

        dispatch(loginFailure("User Not Found!"));
        //console.log("loginAction.js, Request Error: ", err.message);
      });
  };
};
