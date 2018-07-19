import * as actionTypes from './actionTypes';
import axios from 'axios';
//import 'url-search-params-polyfill';

const LOGIN_URL = 'https://akshitsalfredo.herokuapp.com/login';
const CHECK_URL = 'https://akshitsalfredo.herokuapp.com/isauth';
const LOGOUT_URL = 'https://akshitsalfredo.herokuapp.com/logout';
//Hardcoded Crediants remove later
export const attemptLogin = (credentials) => {
  
    console.log("Attempting Login");
    return dispatch => {

        dispatch(loginStarted());


        // axios({
        //             method: 'post',
        //             url: LOGIN_URL,
        //             data: credentials,
        //             config: {
                       
        //               mode: 'no-cors',
        //               headers: {
        //                  'Content-Type': 'application/json',
        //                },
        //                //credentials: 'include',
        //                withCredentials: true,
                       
                      
        //               }
        //       })
        //       .then(response => response.text())
        //       .then(data => {
        //         console.log("here")

        //         console.log(data)
        //         dispatch(loginSuccess(data.username));
        //       })
        //       .catch( error => {
        //         console.log(error);
                
        //           dispatch(loginFailed("Dikkat"));
        //     }); 

            fetch(LOGIN_URL, {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include",
              mode:"cors",
            }).then(function(response) {
                const thisstatus = response.status;     //=> number 100–599
              // console.log(response.statusText) //=> String
              // console.log(response.headers)    //=> Headers
              // console.log(response.url)        //=> String
            
             
              const responsejson = response.json()
              responsejson.then((finalbody)=>{
                if(thisstatus===200)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(loginSuccess(finalbody));
                }
                if(thisstatus===400)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(loginFailed(finalbody.status));
                  
                }

              }
              
              );
              
            }, function(error) {
              error.message //=> String
              dispatch(loginFailed("Error Logging In"));
            })

              // .then(response   =>  {
              //   response.json().then(function(data) {
              //     console.log(data);
              //   });
                
                

              //   dispatch(loginSuccess(response.json().data.username));
              // })
      

    };
}

export const loginStarted = () => {   
  return {
        type: actionTypes.LOGIN_REQUESTED,       
    }
}

export const loginSuccess = (data) => {
    
  const user = data.user;
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

    
            fetch(CHECK_URL, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include",
              mode:"cors",
            }).then(function(response) {
                const thisstatus = response.status;     //=> number 100–599
              // console.log(response.statusText) //=> String
              // console.log(response.headers)    //=> Headers
              // console.log(response.url)        //=> String
            
             
              const responsejson = response.json()
              responsejson.then((finalbody)=>{
                if(thisstatus===200)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(loginSuccess(finalbody))
                 
                }
                if(thisstatus===400)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  //dispatch(logout());
                  
                }
                if(thisstatus===401)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  //dispatch(logout());
                  
                }

              }
              
              );
              
            }, function(error) {
              error.message //=> String
              //Empty Message Cuz 
              dispatch(loginFailed("."));
            })
  };
}

export const logout = () => {
  console.log("Log out initalized");
  return dispatch => {

    
            fetch(LOGOUT_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include",
              mode:"cors",
            }).then(function(response) {
                const thisstatus = response.status;     //=> number 100–599
              
             
              const responsejson = response.json()
              responsejson.then((finalbody)=>{
                if(thisstatus===200)
                {
                  
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(logoutSuccess())
                 
                }
                else if(thisstatus===401)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(logoutSuccess());
                  
                }
                else{
                  console.log(thisstatus)
                  console.log(finalbody)
                  console.log("Unable to Logout")
                }

              }
              );
              
            }, function(error) {
              error.message //=> String
              //Empty Message Cuz 
              dispatch(loginFailed("."));
            })
  };
  
}

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}



