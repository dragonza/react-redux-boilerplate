import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

export default () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-title">Welcome!</div>
      </header>
      <h1>Have a good day!</h1>
      <Link to="/kanban">Todo</Link>
    </div>
  );
};
