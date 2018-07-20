import { combineReducers } from 'redux'
import AuthReducer from '../modules/login/reducers'
import LeaderboardReducer from '../modules/leaderboard/reducers';


export default combineReducers({
    
    auth : AuthReducer,
    leaderboard : LeaderboardReducer

});