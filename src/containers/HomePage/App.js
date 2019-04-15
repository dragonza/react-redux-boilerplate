import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

export default () => {
  return (
    <div className="App">
      <h1>Have a good day!</h1>
      <Link to="/kanban">Todo</Link>
    </div>
  );
};
