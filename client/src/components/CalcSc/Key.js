import React, { Component } from 'react';

export default class Key extends Component {
  render() {
    return (
      <button
        className={this.props.className}
        onClick={this.props.keyPress.bind(this, this.props.keyLog, this.props.math)}
      >{this.props.Tag}</button>
    );
  }
}