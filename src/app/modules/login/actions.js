import * as actionTypes from './actionTypes';
import axios from 'axios';
//import 'url-search-params-polyfill';
import logincall from "./api";

const LOGIN_URL = 'https://akshitsalfredo.herokuapp.com/api/login';
const CHECK_URL = 'https://akshitsalfredo.herokuapp.com/api/isauth';

//Hardcoded Crediants remove later
export const attemptLogin = (credentials) => {
  
    console.log("Attempting Login");
    return dispatch => {

        dispatch(loginStarted());
        dispatch(logincall(loginSuccess(),loginFailed()));
        // axios({
        //             method: 'post',
        //             url: LOGIN_URL,
        //             data: {
        //               "username": "akshitthevijay@gmail.com",
        //               "password": "Password"
        //             },
        //             //config: { headers: {'Content-Type': 'multipart/form-data' }}
        //       })
        //       .then(response =>  {
        //             dispatch(loginSuccess(response.data.data));
        //       })
        //       .catch( error => {
        //             dispatch(loginFailed(error));
        //       });  

    };
}

export const loginStarted = () => {   
  return {
        type: actionTypes.LOGIN_REQUESTED,       
    }
}

export const loginSuccess = (data) => {
    
  const user = data.username;
  return {
        type: actionTypes.LOGIN_SUCCESS,
        user: user
    }
}

export const loginFailed = (error) => {
  return {
      type: actionTypes.LOGIN_FAILURE,
      errorMessage: error
  }
}


export const checkIfAuthenticated = () => {
  
  console.log("Checking If Logged in at Server");
  return dispatch => {

      dispatch(loginStarted());

      axios({
                  method: 'get',
                  url: CHECK_URL,
                 
                  //config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response =>  {
                  dispatch(loginSuccess(response.data.data));
            })
            .catch( error => {
                  dispatch(loginFailed(error));
            });  
  };
}


