
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from "./components/LoginForm/LoginForm"
import Loader from "./components/Loader/Loader";
import * as actions from './actions';


class Login extends Component {
  static propTypes = {
    loggingIn: PropTypes.Boolean,
    loggedIn: PropTypes.Boolean,
    user: PropTypes.String,
    failure: PropTypes.Boolean,
    failureMessage: PropTypes.String,
  }

  authenticate(credentials){
    this.props.requestAuthentication(credentials);    
  }
  
  render() {
    
    let componentToRender = {};
    let messageToRender = {};


    if(this.props.loggingIn){
      componentToRender = <Loader/> ;
    }
    else{
      componentToRender = <LoginForm authenticate ={(credentials) => this.authenticate(credentials)}/> ;
      if(this.props.failure){
        messageToRender = this.props.failureMessage;
      }
    }

    return (
      <div>
       {componentToRender}
      
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggingIn: state.auth.loggingIn,
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
  failure : state.auth.failure,
  failureMessage : state.auth.failureMessage
})

const mapDispatchToProps = dispatch => {
  return {
      requestAuthentication : (credentials) => {dispatch(actions.attemptLogin(credentials))},
      checkIfAuthenticated : () => {dispatch(actions.checkIfAuthenticated())}
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

