// import {Alert} from 'react-native';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SET_AUTH_TOKEN,
    SET_CURRENT_USER,
    LOGOUT_USER

  } from '../actions/loginActions';
  
  // init state for login
  const initState = {
    isLoading: false,
    isAuth: false,
    loginData: {},
    errMsg: "",
    authToken: "",
    userDetails:""
  }
  
  const loginReducer = (state = initState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case LOGIN_SUCCESS:
        return {
          isAuth: true,
          isLoading: false,
          loginData: action.payload,
          errMsg: "",
        }
      case LOGIN_FAILURE:
        return {
          isLoading: false,
          isAuth: false,
          loginData: {},
          errMsg: action.payload,
        }
      case SET_AUTH_TOKEN:
        return {
          ...state,
          authToken: action.payload,
        }
        case SET_CURRENT_USER:
          return{
          ...state,
          userDetails:action.payload,
          isAuth:true
      }
      case LOGOUT_USER:return{
        ...state,
        isAuth:false
    }
      default:
        return state;
    }
  }
  
  export default loginReducer;