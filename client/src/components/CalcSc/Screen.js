import React, { Component } from 'react';
import Result from './Result';
import Log from './Input';

export default class Screen extends Component {
  render() {
    return (
      <div className="screen">
        <Log log={this.props.log} handleInputChange={this.props.handleInputChange} />
        <Result result={this.props.result} />
      </div>
    );
  }
}

