import {
    UPLOAD_REQUEST,
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
  } from '../actions/postsActions';
  
  // init state for signup
  const initState = {
    isLoading: false,
    isUpoaded: false,
    Data: {},
    errMsg: "",
  }
  
  // the sign up reducer
  const postsReducer = (state = initState, action) => {
    switch (action.type) {
      case  UPLOAD_REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case  UPLOAD_SUCCESS:
        return {
          isLoading: false,
          isUploaded: true,
       Data: action.payload,
          errMsg: "",
        }
      case  UPLOAD_FAILURE:
        return {
          isLoading: false,
          isUploaded: false,
          Data: {},
          errMsg: action.payload,
        }
      default:
        return state;
    }
  }
  
  export default postsReducer;