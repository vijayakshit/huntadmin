import React, { Component } from 'react'
import {  Menu, Dropdown, Icon } from 'antd';
import './HuntSelectorDropdown.css';

export default class HuntSelectorDropdown extends Component {
  

    

  
  render() {
    

    const hunts = this.props.listOfHunts
    
    const menuItems = []
    
    for (var menukey in hunts) {
      menuItems.push(
          <Menu.Item key={menukey}>
            <div>
              {hunts[menukey].huntname}
            </div>
          </Menu.Item>
      );

    }


    const getmenu = () => {
      return(
        <Menu onClick={(key) => this.props.changeSelectedHuntTo(key.key)}>
          {menuItems}
        </Menu>
      );
  
    }

    return (
      <div className="huntSelectorContainer">
          
            <Dropdown overlay={getmenu()}>
              <div>
                Select Hunt <Icon style={{ fontSize: "1.2rem" }} type="down" />
              </div>
            </Dropdown>
          
            <div className="currentHuntName" >
              {this.props.selectedHuntName}
            </div>
         
      </div>
    )
  }
}



