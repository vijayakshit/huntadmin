import { combineReducers } from 'redux'
import user from './users';
import AuthReducer from '../modules/login/reducers'
import LeaderboardReducer from '../modules/leaderboard/reducers';


export default combineReducers({
    //user : user,
    auth : AuthReducer,
    leaderboard : LeaderboardReducer

});