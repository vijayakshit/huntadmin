
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
    
    loading: PropTypes.Boolean,
    
    selectedHunt : PropTypes.String,
    selectedHuntData : PropTypes.object,
    listOfHunts : PropTypes.object,
    leaderboardData: PropTypes.Boolean,

    failure: PropTypes.Boolean,
    failureMessage: PropTypes.String,

  }

  
  componentDidMount(){
    this.props.requestLeaderboardDataFetch();
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
            {this.props.failureMessage}
          </span>
        );
      }
      componentsToRender.push (<HuntSelectorDropdown listOfHunts={this.props.listOfHunts}/> );
      componentsToRender.push (<LeaderBoardTable  selectedHuntData={this.props.selectedHuntData}/> );
      //componentsToRender.push (this.props );
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

  loading: state.leaderboard.loading,
    
  selectedHunt :state.leaderboard.selectedHunt,
  selectedHuntData : state.leaderboard.selectedHuntData,
  listOfHunts : state.leaderboard.listOfHunts,
  leaderboardData: state.leaderboard.leaderboardData,

  failure: state.leaderboard.failure,
  failureMessage: state.leaderboard.failureMessage,
})

const mapDispatchToProps = dispatch => {
  return {
    requestLeaderboardDataFetch : () => {dispatch(actions.fetchLeaderboardData())},
    changeSelectedHuntTo : (huntid) => {dispatch(actions.changeSelectedHunt(huntid))}
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)

