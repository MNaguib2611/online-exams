import React, { Component } from 'react';
import Screen from './Screen';
import Keypad from './Keypad';
import './style.css';

const math = require('mathjs-expression-parser');

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      log: '',
      clickedEquals: false,
      ans: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  // handle keypad exeptions
  componentDidMount() {
    window.onerror = () =>
      this.setState({ log: 'Syntax Error', clickedEquals: true });
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleEqualsClick(this.state.log);
      }

      if (e.key.match(/[+\-^]/)) {
        if (this.state.clickedEquals)
          this.setState({ log: 'Ans', clickedEquals: false });
      }

      const mathEntities = {
        '*': '×',
        '/': '÷',
      };

      if (e.key.match(/[*/]/)) {
        e.preventDefault();
        const clickedEquals = this.state.clickedEquals;
        if (clickedEquals)
          this.setState({
            log: `Ans${mathEntities[e.key]}`,
            clickedEquals: false,
          });
        else this.setState({ log: this.state.log + mathEntities[e.key] });
      }

      if (!e.key.match(/[+\-^*/]|Enter/)) {
        if (this.state.clickedEquals)
          this.setState({ log: '', clickedEquals: false });
      }
    });
  }

  keyPress(keyLog, math) {
    const currentLog = this.state.log;
    const clickedEquals = this.state.clickedEquals;
    if (math === 'clear') {
      this.setState({ log: '', result: 0 });
    }

    if (math === 'delete') {
      if (currentLog.charAt(currentLog.length - 2).match(/[ns]/)) {
        this.setState({ log: currentLog.slice(0, currentLog.length - 4) });
      } else {
        this.setState({ log: currentLog.slice(0, currentLog.length - 1) });
      }
    }

    if (math === 'equals') {
      this.handleEqualsClick(currentLog);
    }

    if (math.match(/trig|log|number|comma|prnths|ans|sqrt|exponent/)) {
      if (clickedEquals) this.setState({ log: keyLog, clickedEquals: false });
      else this.setState({ log: currentLog + keyLog });
    }

    if (math.match(/sum|sub|multiply|divide|power|sqr|inv/)) {
      if (clickedEquals)
        this.setState({ log: `Ans${keyLog}`, clickedEquals: false });
      else this.setState({ log: currentLog + keyLog });
    }
  }

  handleEqualsClick(currentLog) {
    const times = '×';
    const divide = '÷';
    const sqrt = '√';
    const sqrtReg = new RegExp(sqrt, 'g');

    // change log so it's readable to mathjs eval() method
    const newLog = currentLog
      .replace(times, '*')
      .replace(divide, '/')
      .replace(/Ans/g, `(${this.state.ans.toString()})`)
      .replace(/E/g, '10^')
      .replace(/log/g, 'log10')
      .replace(/ln/g, 'log')
      .replace(sqrtReg, 'sqrt');

    let result;
    try {
      result = math.eval(newLog);
    } catch (error) {
      return this.setState({ log: 'Syntax Error', clickedEquals: true });
    }
    let finalResult;

    if (currentLog === '') {
      result = 0;
    }

    // trim result if too long
    if (result.toString().length > 11) {
      finalResult = result.toString().slice(0, 11);
    } else finalResult = result;

    this.setState({
      ans: finalResult,
      result: finalResult,
      clickedEquals: true,
    });
  }

  handleInputChange(input) {
    this.setState({ log: input });
  }

  render() {
    return (
      <div className='calc-container'>
        <span className='description'>Scientific Calculator</span>
        <Screen
          log={this.state.log}
          result={this.state.result}
          handleInputChange={this.handleInputChange}
        />
        <Keypad keyPress={this.keyPress} />
      </div>
    );
  }
}
