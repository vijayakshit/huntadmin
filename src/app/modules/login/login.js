
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from "./components/LoginForm/LoginForm"
import * as actions from './actions';
import './login.css';
import 'antd/dist/antd.css';
import Loader from '../../components/Loader/Loader';

class Login extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    loggedIn: PropTypes.bool,
    user: PropTypes.string,
    failure: PropTypes.bool,
    failureMessage: PropTypes.string,
  }

  authenticate(credentials){
    this.props.requestAuthentication(credentials);    
  }
  
  componentDidMount(){
    this.props.checkIfAuthenticated();
  }


  render() {

    
    let componentsToRender = [];


    if(this.props.loggingIn){
      componentsToRender.push(<Loader key={"loader"}/>);
    }
    else{
      componentsToRender.push (
                <LoginForm key={"loginform"} authenticate ={(credentials) => this.authenticate(credentials)}/> 
      );

      if(this.props.failure){
        componentsToRender.push(
          <span key={"failuremessage"} style={{color:"red"}} >
            {this.props.failureMessage}
          </span>
        );
      }
    }

    return (
      <div className="loginContainer">
        
        <div className="formContainer">
          {componentsToRender}
        </div>

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

