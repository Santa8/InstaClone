import axios from "axios";
//import store from '../../../Store';
const jwt = require("jsonwebtoken");
import deviceStorage from "./deviceStorege";





export const listUsers = () => {
    
     
      axios({
        method: "post",
        url: "/listUsers",
        baseURL: "http://localhost:3000",
      })
        .then((res) => {


          //console.log(res.data.lista);

          return res.data.lista


        })
  
        .catch((err) => {
          console.log(err.message);
  
                  });
    };
  




// async impure action creator enabled by redux-thunk
