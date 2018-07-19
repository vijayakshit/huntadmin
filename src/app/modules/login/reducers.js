
import * as actionTypes from './actionTypes';

const initialState = {
    loggingIn: false,
    loggedIn: false,
    user: null,
    failure : false,
    failureMessage : null,    
}

    const onStartLogin = (state) => {

        const changeInState = {
            loggingIn : true,
        }
        const newState = updateState(state,changeInState)
        return newState
    }

    const onLoginFailed = (state,action) => {
        const changeInState = {
            loggedIn: false,
            loggingIn: false,
            failure : true,
            failureMessage : action.failureMessage
        }
        const newState = updateState(state,changeInState)
        return newState
    }

//Set State To Fetch data Errored With Correct error message, Checking For Empty State right now remove check for true error popup
    const onLoginComplete = (state,action) => {
          
            const changeInState = {
                loggedIn: true,
                loggingIn: false,
                user : action.user
            }
            const newState = updateState(state,changeInState)
            return newState
    }

    const onLogout = (state,action) => {
          
        const changeInState = {
            loggedIn: false,
            loggingIn: false,
            user : null
        }
        const newState = updateState(state,changeInState)
        return newState
    }

    const updateState = (state,changeInState) => {
        const newState = { ...state, ...changeInState };
        return newState;
    }

    const authReducer = (state = initialState, action) => { 
        console.log('In auth reducer');
        switch (action.type) {
            case actionTypes.LOGIN_REQUESTED : return onStartLogin(state);
            case actionTypes.LOGIN_SUCCESS : return onLoginComplete(state,action);
            case actionTypes.LOGIN_FAILURE : return onLoginFailed(state,action);
            case actionTypes.LOGOUT_SUCCESS : return onLogout(state,action);
            default : return state;
        }

    
    };

    export default authReducer;