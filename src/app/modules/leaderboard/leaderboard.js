
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions';
import 'antd/dist/antd.css';
import Loader from '../../components/Loader/Loader';
import LeaderBoardTable from "./components/LeaderBoardTable/LeaderBoardTable";
import HuntSelectorDropdown from "./components/HuntSelectorDropdown/HuntSelectorDropdown";
import './leaderboard.css'



class Leaderboard extends Component {
  static propTypes = {
    
    loading: PropTypes.bool,
    
    selectedHunt : PropTypes.string,
    selectedHuntData : PropTypes.object,
    listOfHunts : PropTypes.object,
    leaderboardData: PropTypes.object,

    failure: PropTypes.bool,
    failureMessage: PropTypes.object,

    requestLeaderboardDataFetch:PropTypes.func,
    changeSelectedHuntTo:PropTypes.func
  }

  
  componentDidMount(){
    this.props.requestLeaderboardDataFetch();
  }


  render() {

    
    let componentsToRender = [];
    if(this.props.loading){
      componentsToRender.push(<Loader key={'loader'}/>);
    }
    else{
      if(this.props.failure){
        componentsToRender.push(
          <span style={{color:"red"}} >
            {this.props.failureMessage}
          </span>
        );
      }

      if(!this.props.loading && this.props.selectedHunt !== null)
      {
          componentsToRender.push (

              <HuntSelectorDropdown 
                  key ={"huntselector"}
                  selectedHuntName={this.props.listOfHunts[this.props.selectedHunt]["huntname"]}
                  changeSelectedHuntTo={this.props.changeSelectedHuntTo} 
                  listOfHunts={this.props.listOfHunts}/> 
            
          );

          componentsToRender.push (
            
              <LeaderBoardTable 
                key ={"leaderboardtable"}
                selectedHuntData={this.props.selectedHuntData}/> 
            
          );
      }
      //componentsToRender.push (this.props );
    }

    return (
      <div className="leaderboardContainer">
       
        
          {componentsToRender}
          
       

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

