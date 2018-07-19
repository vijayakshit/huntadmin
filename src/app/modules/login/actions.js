import * as actionTypes from './actionTypes';

const LOGIN_URL = 'https://akshitsalfredo.herokuapp.com/login';
const CHECK_URL = 'https://akshitsalfredo.herokuapp.com/isauth';
const LOGOUT_URL = 'https://akshitsalfredo.herokuapp.com/logout';

export const attemptLogin = (credentials) => {
  
    console.log("Attempting Login");
    return dispatch => {

        dispatch(loginStarted());
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
                }
              )
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

    
    fetch(CHECK_URL, 
          {
            method: "GET",
            headers: {
                        "Content-Type": "application/json"
                      },
            credentials: "include",
            mode:"cors",
          }
        )
        .then(function(response) {
                  const thisstatus = response.status;     //=> number 100–599
                  const responsejson = response.json()
                  responsejson.then((finalbody)=>{
                      console.log(thisstatus)
                      console.log(finalbody)  
                      if(thisstatus===200)
                      {
                        dispatch(loginSuccess(finalbody))
                      }
                    }     
                  );  
              }, function(error) {
                  console.log(error.message) 

                }
    )
  };
}


export const logout = () => {

  
  
    console.log("Checking If Logged in at Server");
    return dispatch => {
  
      
      fetch(LOGOUT_URL, 
            {
              method: "POST",
              headers: {
                          "Content-Type": "application/json"
                        },
              credentials: "include",
              mode:"cors",
            }
          )
          .then(function(response) {
                    const thisstatus = response.status;     //=> number 100–599
                    const responsejson = response.json()
                    responsejson.then((finalbody)=>{
                        console.log(thisstatus)
                        console.log(finalbody)  
                        if(thisstatus===200)
                        {
                          dispatch(logout(finalbody))
                        }
                      }     
                    );  
                }, function(error) {
                    console.log(error.message) 
  
                  }
      )
    };
  

  // return dispatch => {

    
  //           fetch(LOGOUT_URL, {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json"
  //             },
  //             body:{"Just":"A Body"},
  //             credentials: "include",
  //             mode:"cors",
  //           }).then(function(response) {
  //               const thisstatus = response.status;     //=> number 100–599
              
             
  //             const responsejson = response.json()
  //             responsejson.then((finalbody)=>{
  //               if(thisstatus===200)
  //               {
                  
  //                 console.log(thisstatus)
  //                 console.log(finalbody)
  //                 dispatch(onlogoutSuccess())
                 
  //               }
  //               else if(thisstatus===401)
  //               {
  //                 console.log(thisstatus)
  //                 console.log(finalbody)
  //                 dispatch(onlogoutSuccess());
                  
  //               }
  //               else{
  //                 console.log(thisstatus)
  //                 console.log(finalbody)
  //                 console.log("Unable to Logout")
  //               }

  //             }
  //             );
              
  //           }, function(error) {
  //             console.log(error.message) //=> String
  //             //Empty Message Cuz 
  //           })
  // };
  
}

export const onlogoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}



