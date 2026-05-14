import React from 'react';
import withLogger from './WithLogger';

const MyComponent = ({ message }) => {
  return <div>{message}</div>;
};

export default withLogger(MyComponent);