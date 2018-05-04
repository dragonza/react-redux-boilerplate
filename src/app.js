import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="App">
      <div>test</div>
      <h1>Have a good day!</h1>
      <Link to="/todo">Todo</Link>
    </div>
  );
};
