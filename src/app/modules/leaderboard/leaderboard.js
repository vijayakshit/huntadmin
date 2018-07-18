
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions';
import 'antd/dist/antd.css';
import Loader from '../../components/Loader/Loader';
import LeaderBoardTable from "./components/LeaderBoardTable/LeaderBoardTable";
import HuntSelectorDropdown from "./components/HuntSelectorDropdown/HuntSelectorDropdown";
import axios from 'axios';



class Leaderboard extends Component {
  static propTypes = {
    LeaderboardData: PropTypes.Boolean,
    loading: PropTypes.Boolean,
    failure: PropTypes.Boolean,
    failureMessage: PropTypes.String,
  }

  // authenticate(credentials){
  //   this.props.requestAuthentication(credentials);    
  // }
  
  componentDidMount(){
    //this.props.requestLeaderboardData();
    axios({
      method: 'get',
      url: 'https://akshitsalfredo.herokuapp.com/api/getit',
      
      config: {
         
         mode: 'no-cors',
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json',
         },
         withCredentials: true,
         credentials: 'same-origin',
        
        }
    })
    .then(response =>  {
      console.log(response)    
     
    })
    .catch( error => {
        console.log(error);
        
        
    });  


  }


  render() {

    console.log(this.props);
    
    let componentsToRender = [];


    if(this.props.loading){
      componentsToRender.push(<Loader/>);
    }
    else{
      if(this.props.failure){
        componentsToRender.push(
          <span style={{color:"red"}} >
            {this.props.failureMessage.response.data.status}
          </span>
        );
      }
      
      componentsToRender.push (<HuntSelectorDropdown /> );
      componentsToRender.push (<LeaderBoardTable /> );

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
  loading: state.auth.loggingIn,
  LeaderboardData: state.auth.user,
  failure : state.auth.failure,
  failureMessage : state.auth.failureMessage
})

const mapDispatchToProps = dispatch => {
  return {
      requestAuthentication : (credentials) => {dispatch(actions.attemptLogin(credentials))},
      checkIfAuthenticated : () => {dispatch(actions.checkIfAuthenticated())}
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)

