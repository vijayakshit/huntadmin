
import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './core/actions'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../app/hoc/auth';

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

import LeaderboardComponent from './modules/leaderboard'
import AboutHuntComponent from '../app/modules/abouthunt'
import LoginComponent from '../app/modules/login'


const getUserName = user => {
  if (user.data) {
    return `Welcome ${user.data.name}`
  }
  return `Not logged in`
}

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginComponent)
const AboutHunt = userIsAuthenticatedRedir(AboutHuntComponent)
const Leaderboard = userIsAuthenticatedRedir(LeaderboardComponent)


// Only show login when the user is not logged in and logout when logged in
// Could have also done this with a single wrapper and `FailureComponent`
const UserName = ({ user }) => (<div>{getUserName(user)}</div>)
const LoginLink = userIsNotAuthenticated(() => <NavLink to="/login">Login</NavLink>)
const LogoutLink = userIsAuthenticated(({ logout }) => <a href="#" onClick={() => logout()}>Logout</a>)

function App({ user , logout }) {
  return (
    <Router>
      <div >
        <nav >
          <NavLink exact to="/">AboutHunt</NavLink>
          <br />
          <NavLink exact to="/leaderboard">Leaderboard</NavLink>
          <br />

          <LoginLink />
          <br />

          <LogoutLink logout={logout} />
          <br />

          <UserName user={user} />
        </nav>
        <div >
          <Route exact path="/" component={AboutHunt}/>
          <Route path="/login" component={Login}/>
          <Route path="/leaderboard" component={Leaderboard}/>
        </div>
    </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { logout })(App)