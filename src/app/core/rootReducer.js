import { combineReducers } from 'redux'
import user from './users';
import AuthReducer from '../modules/login/reducers'


export default combineReducers({
    //user : user,
    auth : AuthReducer
});