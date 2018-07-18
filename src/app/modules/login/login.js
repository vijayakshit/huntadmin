
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
    loggingIn: PropTypes.Boolean,
    loggedIn: PropTypes.Boolean,
    user: PropTypes.String,
    failure: PropTypes.Boolean,
    failureMessage: PropTypes.String,
  }

  authenticate(credentials){
    this.props.requestAuthentication(credentials);    
  }
  
  componentDidMount(){
    //this.props.checkIfAuthenticated();
  }


  render() {

    console.log(this.props);
    
    let componentsToRender = [];


    if(this.props.loggingIn){
      componentsToRender.push(<Loader/>);
    }
    else{
      componentsToRender.push (<LoginForm authenticate ={(credentials) => this.authenticate(credentials)}/> );
      if(this.props.failure){
        componentsToRender.push(
          <span style={{color:"red"}} >
            {this.props.failureMessage.response.data.status}
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

