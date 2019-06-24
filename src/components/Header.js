import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import {makeAuthTokenSelector} from "../containers/Auth/auth-selector";

class Header extends Component {
  renderMenu = () => {
    const {  authenticated } = this.props;
    if (!authenticated.length) {
      return (
        <>
          <Link to="/signup" className="nav__item">Sign Up</Link>
          <Link to="/signin" className="nav__item">Sign In</Link>
        </>
      )
    }

    return (
      <>
        <Link to="/feature" className="nav__item">Feature</Link>
        <Link to="/signout" className="nav__item">Sign Out</Link>
      </>
    )
  };


  render() {
    return (
      <header className="header">
        <div className="logo">
          <Link  to="/" className="logo__item">Logo </Link >
        </div>
        <nav className="nav">
          {this.renderMenu()}
        </nav>
      </header>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  authenticated: makeAuthTokenSelector(),
});

Header.propTypes = {
  authenticated: PropTypes.string,
};

Header.defaultProps = {
  authenticated: '',
};

export default connect(mapStateToProps)(Header);
