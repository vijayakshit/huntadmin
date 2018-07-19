import * as actionTypes from './actionTypes';
import {LOGOUT}  from '../login/actionTypes';
import axios from 'axios';
//import 'url-search-params-polyfill';

const LEADERBOARD_FETCH_URL = 'https://akshitsalfredo.herokuapp.com/api/getallhuntleaderboard';

//Hardcoded Crediants remove later
export const fetchLeaderboardData = () => {
  
    console.log("Attempting Leaderboard Data Fetch");
    return dispatch => {

        dispatch(fetchLeaderboardStarted());

            fetch(LEADERBOARD_FETCH_URL, {
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
                  dispatch(fetchLeaderboardSuccess(finalbody));
                }
                if(thisstatus===400)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(fetchLeaderboardFailed(finalbody.status));
                  
                }
                if(thisstatus===401)
                {
                  console.log(thisstatus)
                  console.log(finalbody)
                  dispatch(logout());
                  
                }

              }
              
              );
              
            }, function(error) {
              error.message //=> String
              dispatch(fetchLeaderboardFailed("Error Fetching Leaderboard"));
            })
    };
}

export const fetchLeaderboardStarted = () => {   
  return {
        type: actionTypes.LEADERBOARD_DATA_REQUEST_INITIATE,       
    }
}

export const fetchLeaderboardSuccess = (data) => {
    
  const leaderboardData = data.leaderboarddata
  const selectedHunt = data.selectedhunt
  const selectedHuntData = data.selectedhuntdata
  const listOfHunts = data.allHunts


  return {
        type: actionTypes.LEADERBOARD_DATA_REQUEST_SUCCESS,
        
        leaderboardData: leaderboardData,
        listOfHunts : listOfHunts,
        selectedHunt : selectedHunt,
        selectedHuntData : selectedHuntData,

    }
}

export const fetchLeaderboardFailed = (error) => {
  return {
      type: actionTypes.LEADERBOARD_DATA_REQUEST_FAILURE,
      failureMessage: error
  }
}

export const changeSelectedHunt = (huntId) => {
  return {
      type: actionTypes.CHANGE_SELECTED_HUNT,
      huntId: huntId
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}


