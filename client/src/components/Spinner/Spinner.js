import React from 'react';
import classes from './Spinner';

const Spinner = () => {
  return (
    <div className={classes.lds_ripple}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
