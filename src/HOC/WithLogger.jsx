import React from 'react';

import { useEffect } from 'react';

const withLogger = (WrappedComponent) => {
  const WithLogger = (props) => {
    useEffect(() => {
      console.log(`Component ${WrappedComponent.name} is mounted.`);
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithLogger;
};

export default withLogger;