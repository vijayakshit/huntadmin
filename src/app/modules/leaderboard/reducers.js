
import * as actionTypes from './actionTypes';

const initialState = {
    loading: true,
  
    selectedHunt : null,
    selectedHuntData : null,
    listOfHunts : null,
    leaderboardData: null,

    failure : false,
    failureMessage : null,    
}

    const onLeaderboardFetchStart = (state,action) => {

        const changeInState = {
            loading : true,
            failure : false,
            failureMessage : null,    
        }
        const newState = updateState(state,changeInState)
        return newState
    }

    const onLeaderboardFetchFailure = (state,action) => {
        const changeInState = {
            loading: false,
            failure : true,
            failureMessage : action.failureMessage
        }
        const newState = updateState(state,changeInState)
        return newState
    }

//Set State To Fetch data Errored With Correct error message, Checking For Empty State right now remove check for true error popup
    const onLeaderboardFetchComplete = (state,action) => {
          
            const changeInState = {
                loading: false,
                failure : false,
                failureMessage : null,

                leaderboardData : action.leaderboardData,
                selectedHunt : action.selectedHunt,
                selectedHuntData : action.selectedHuntData,
                listOfHunts : action.listOfHunts
                
            }
            const newState = updateState(state,changeInState)
            return newState
    }

    const changeHuntForLeaderboard = (state,action) => {
          
        const changeInState = {
            loading: false,
            failure : false,
            failureMessage : null,

            
            selectedHunt : action.huntId,
            selectedHuntData : state.leaderboardData.selectedHunt,
            
        }
        const newState = updateState(state,changeInState)
        return newState
    }

    const updateState = (state,changeInState) => {
        const newState = { ...state, ...changeInState };
        return newState;
    }

    const leaderboardReducer = (state = initialState, action) => { 
        console.log('In Leaderboard Reducer');
        switch (action.type) {
            case actionTypes.LEADERBOARD_DATA_REQUEST_INITIATE : return onLeaderboardFetchStart(state);
            case actionTypes.LEADERBOARD_DATA_REQUEST_SUCCESS : return onLeaderboardFetchComplete(state,action);
            case actionTypes.LEADERBOARD_DATA_REQUEST_FAILURE : return onLeaderboardFetchFailure(state,action);
            case actionTypes.CHANGE_SELECTED_HUNT : return changeHuntForLeaderboard(state,action);
            default : return state;
        }

    
    };

    export default leaderboardReducer;