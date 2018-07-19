import React, { Component } from 'react'
import { Button,Menu, Dropdown, Icon } from 'antd';


export default class HuntSelectorDropdown extends Component {
  

    
  
  
  render() {

    const menu = () => {
      return(
        <Menu>
          <Menu.Item>
            <div>One</div>
          </Menu.Item>
          <Menu.Item>
            <div>Two</div>
          </Menu.Item>
          <Menu.Item>
            <div>Three</div>
          </Menu.Item>
        </Menu>
      );
  
    }

    return (
      <div>
          <Dropdown overlay={menu()}>
            <a className="ant-dropdown-link" href="#">
              Hover me <Icon type="down" />
            </a>
          </Dropdown>
      </div>
    )
  }
}



