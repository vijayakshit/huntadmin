import React, { Component } from 'react'
import { Spin } from 'antd';

export default class Loader extends Component {
  render() {
    return (
      <div style={{
        backgroundColor:"#ffffff",
        width:"100%",
        height:"800px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
        opacity:"20%",
        paddingTop:"20%"
        }}>
          <div >
            <Spin size="large" />
            </div>
      </div>
    )
  }
}
