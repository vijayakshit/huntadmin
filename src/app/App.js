
import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
         userIsAuthenticated } from './hoc/auth';
import LeaderboardComponent from './modules/leaderboard'
import HuntKitchenComponent from './modules/huntkitchen'
import AboutHuntComponent from './modules/abouthunt'
import LoginComponent from './modules/login'
import * as actions from "./modules/login/actions"

import './App.css';


// Applying HOCs
const Login = userIsNotAuthenticatedRedir(LoginComponent)
const AboutHunt = userIsAuthenticatedRedir(AboutHuntComponent)
const Leaderboard = userIsAuthenticatedRedir(LeaderboardComponent)
const HuntKitchen = userIsAuthenticatedRedir(HuntKitchenComponent)
// const LoginLink = userIsNotAuthenticated(() => <NavLink to="/login">Login</NavLink>)

const AppHeaderComponent =() => {
  return(
    <div className="appHeader" >
    <span className="appName">HUNT</span>
  </div>
  );
}
//const AppHeader = userIsNotAuthenticated(AppHeaderComponent)
const AppHeader = AppHeaderComponent;

const NavigaionLink = ({logoutHandler}) => {
  

  return(
    <nav >
    <div className="navHeader">
        <span className="navItems">
          <NavLink  exact to="/" >
            <span className="navItem">
              AboutHunt
            </span>
          </NavLink>
          <NavLink exact to="/leaderboard">
            <span className="navItem">
              Leaderboard
            </span>
          </NavLink>
          <NavLink exact to="/huntkitchen">
            <span className="navItem">
              Hunt Kitchen
            </span>
          </NavLink>
        </span>
        <span className="navItems">
         
            <span className="logoutNavItem">
              <a href="#" onClick={() => logoutHandler()}>Logout</a>
            </span>
          
        </span>
      
    </div >
    </nav >
  );
}     
const Navigation = userIsAuthenticated(NavigaionLink)



function App({ auth , requestLogout }) {

  return (
  <div className={{height:"100%"}}>
    <Router>
      <div>
      <AppHeader/>
      <Navigation logoutHandler={() => requestLogout()} />  
      <div className="appContentContainer">


          
            
          

          <div className="appContent">
            <Route exact path="/" component={AboutHunt}/>
            <Route path="/huntkitchen" component={HuntKitchen}/>
            <Route path="/login" component={Login}/>
            <Route path="/leaderboard" component={Leaderboard}/>
          </div>
        </div>
      </div>
    </Router>
  </div>
          
    )
}

const mapDispatchToProps = dispatch => {
  return {      
      requestLogout : () => {dispatch(actions.logout())},
  }
  
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(App)