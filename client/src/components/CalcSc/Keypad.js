import React, { Component } from 'react';

import Key from './Key';

export default class Keypad extends Component {
  render() {
    const keyPress = this.props.keyPress;
    const x = <span key='&#x1D4B3'>&#x1D4B3;</span>;
    const inv = <sup key='-1'>-1</sup>;
    const pow2 = <sup key='2'>2</sup>;
    const pow3 = <sup key='3'>3</sup>;

    return (
      <div>
        <div className='keypad-row-sm'>
          <Key
            className='sm-button'
            Tag={[x, inv]}
            keyLog='^-1'
            math='inv'
            key='inv'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            Tag='&radic;'
            keyLog='&radic;('
            math='sqrt'
            key='sqrt'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            Tag={[x, pow2]}
            keyLog='^2'
            key='^2'
            math='sqr'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            Tag='^'
            keyLog='^'
            key='^'
            math='power'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            Tag='log'
            keyLog='log('
            key='log('
            math='log'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            Tag='ln'
            keyLog='ln('
            key='ln('
            math='log'
            keyPress={keyPress}
          />
        </div>
        <div className='keypad-row-sm'>
          <Key
            className='sm-button'
            keyLog='-'
            Tag='(&minus;)'
            key='(&minus;)'
            math='sub'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog='^3'
            Tag={[x, pow3]}
            key={[x, pow3]}
            math='power'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog=''
            Tag='hyp'
            key='hyp'
            math='log'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog='sin('
            Tag='sin'
            key='sin'
            math='trig'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog='cos('
            Tag='cos'
            key='cos'
            math='trig'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog='tan('
            Tag='tan'
            key='tan'
            math='trig'
            keyPress={keyPress}
          />
        </div>
        <div className='keypad-row-sm'>
          <Key
            className='sm-button'
            keyLog=''
            Tag='RCL'
            key='RCL'
            math=''
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog=''
            Tag='ENG'
            key='ENG'
            math=''
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog='('
            Tag='('
            key='('
            math='prnths'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog=')'
            Tag=')'
            key=')'
            math='prnths'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog=''
            Tag=','
            key=','
            math='log'
            keyPress={keyPress}
          />
          <Key
            className='sm-button'
            keyLog=''
            Tag='M+'
            key='M+'
            math='log'
            keyPress={keyPress}
          />
        </div>
        <div className='keypad-row'>
          <Key key='1' Tag='1' keyLog='1' math='number' keyPress={keyPress} />
          <Key key='2' Tag='2' keyLog='2' math='number' keyPress={keyPress} />
          <Key key='3' Tag='3' keyLog='3' math='number' keyPress={keyPress} />
          <Key
            className='orange-button'
            Tag='DEL'
            key='DEL'
            math='delete'
            keyPress={keyPress}
          />
          <Key
            className='orange-button'
            Tag='AC'
            key='AC'
            math='clear'
            keyPress={keyPress}
          />
        </div>
        <div className='keypad-row'>
          <Key key='4' Tag='4' keyLog='4' math='number' keyPress={keyPress} />
          <Key key='5' Tag='5' keyLog='5' math='number' keyPress={keyPress} />
          <Key key='6' Tag='6' keyLog='6' math='number' keyPress={keyPress} />
          <Key
            Tag='&times;'
            key='&times;'
            keyLog='&times;'
            math='multiply'
            keyPress={keyPress}
          />
          <Key
            key='&divide;'
            Tag='&divide;'
            keyLog='&divide;'
            math='divide'
            keyPress={keyPress}
          />
        </div>
        <div className='keypad-row'>
          <Key Tag='7' key='7' keyLog='7' math='number' keyPress={keyPress} />
          <Key Tag='8' key='8' keyLog='8' math='number' keyPress={keyPress} />
          <Key Tag='9' key='9' keyLog='9' math='number' keyPress={keyPress} />
          <Key Tag='+' key='+' keyLog='+' math='sum' keyPress={keyPress} />
          <Key
            Tag='&minus;'
            key='&minus;'
            keyLog='-'
            math='subtract'
            keyPress={keyPress}
          />
        </div>
        <div className='keypad-row'>
          <Key Tag='0' key='0' keyLog='0' math='log' keyPress={keyPress} />
          <Key Tag='.' key='.' keyLog='.' math='comma' keyPress={keyPress} />
          <Key
            Tag='EXP'
            key='EXP'
            keyLog='E'
            math='exponent'
            keyPress={keyPress}
          />
          <Key
            Tag='Ans'
            key='Ans'
            keyLog='Ans'
            math='ans'
            keyPress={keyPress}
          />
          <Key Tag='=' math='equals' key='=' keyPress={keyPress} />
        </div>
      </div>
    );
  }
}
