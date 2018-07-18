import React, { Component } from 'react'

const Navigation = (LogoutLink,nav,NavLink) => {
    
    return(
      <nav >
        <NavLink exact to="/">AboutHunt</NavLink>
        <NavLink exact to="/leaderboard">Leaderboard</NavLink>
        <LogoutLink />
        <br />
      </nav>
    );
  }  

  export default Navigation