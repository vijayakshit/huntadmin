
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
            loaded : true,
            failure : true,
            failureMessage : action.failureMessage
        }
        const newState = updateState(state,changeInState)
        return newState
    }

//Set State To Fetch data Errored With Correct error message, Checking For Empty State right now remove check for true error popup
    const onLoginComplete = (state,action) => {
          
            const changeInState = {
                loaded : true,
                errored : true,
                errorMessage : action.errorMessage
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
            default : return state;
        }

    
    };

    export default authReducer;