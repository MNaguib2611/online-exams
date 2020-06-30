import React, { Component } from 'react';

export default class Log extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.props.handleInputChange(this.ref.value);
  }
  render() {
    return (
      <input
        type='text'
        className='log'
        ref={(a) => {
          this.ref = a;
        }}
        value={this.props.log}
        onChange={this.handleInputChange}
        autoFocus
      />
    );
  }
}
