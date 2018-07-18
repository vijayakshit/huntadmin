import * as actionTypes from './actionTypes';
import axios from 'axios';
//import 'url-search-params-polyfill';

const LOGIN_URL = 'https://akshitsalfredo.herokuapp.com/api/getit';
const CHECK_URL = 'https://akshitsalfredo.herokuapp.com/api/isauth';

//Hardcoded Crediants remove later
export const attemptLogin = (credentials) => {
  
    console.log("Attempting Login");
    return dispatch => {

        dispatch(loginStarted());
        axios({
                    method: 'get',
                    url: LOGIN_URL,
                    data: credentials,
                    config: {
                       
                       mode: 'no-cors',
                       headers: {
                         'Access-Control-Allow-Origin': '*',
                         'Content-Type': 'application/json',
                       },
                       withCredentials: true,
                       credentials: 'same-origin',
                      
                      }
              })
              .then(response =>  {
                console.log(response)    
                dispatch(loginSuccess(response.data.username));
              })
              .catch( error => {
                  console.log(error);
                  
                    dispatch(loginFailed(error));
              });  

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
      failureMessage: error
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

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

