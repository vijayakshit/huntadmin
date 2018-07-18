import React, { Component } from 'react';
import { NavigationContainer, NavItem } from './navigationBar.style';

class NavigationBar extends Component {
  render() {
    return (
      <NavigationContainer>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/projects">Project</NavItem>
      </NavigationContainer>
    );
  }
}

export default NavigationBar;