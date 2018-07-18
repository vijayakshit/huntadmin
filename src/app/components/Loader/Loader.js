import React, { Component } from 'react'
import { Spin } from 'antd';

export default class Loader extends Component {
  render() {
    return (
      <div>
          <Spin size="large" />
      </div>
    )
  }
}
