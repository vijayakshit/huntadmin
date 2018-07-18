import * as actionTypes from './actionTypes';
import axios from 'axios';
//import 'url-search-params-polyfill';

const LOGIN_URL = 'https://akshitsalfredo.herokuapp.com/login';
const CHECK_URL = 'https://akshitsalfredo.herokuapp.com/api/getit';

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
                  dispatch(loginSuccess(finalbody.username));
                }
                if(thisstatus===400)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(loginFailed("Bad Request"));
                  
                }

              }
              
              );
              
            }, function(error) {
              error.message //=> String
              dispatch(loginFailed("Dikkat"));
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

      

      // axios({
      //             method: 'get',
      //             url: CHECK_URL,
                 
      //             //config: { headers: {'Content-Type': 'multipart/form-data' }}
      //       })
      //       .then(response =>  {
      //             dispatch(loginSuccess(response.data.data));
      //       })
      //       .catch( error => {
      //             dispatch(loginFailed(error));
      //       });  
      

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
                  dispatch(loginSuccess())
                 
                }
                if(thisstatus===400)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(logout());
                  
                }

              }
              
              );
              
            }, function(error) {
              error.message //=> String
              dispatch(loginFailed("Dikkat"));
            })






  };
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}


