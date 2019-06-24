import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect/lib/index';
import { signIn } from '../auth-action';
import {makeAuthErrorSelector, makeAuthTokenSelector} from '../auth-selector';
import SigninForm from "./SigninForm";

class Signin extends Component {
  handleLogin = formProps => {
    const { signIn } = this.props;
    console.log('formProps', formProps);
    console.log('this.props', this.props);
    const user = {
      email: formProps.get('email'),
      password: formProps.get('password'),
    };
    signIn(user);
  };

  render() {
    const { errorMessage, authenticated, location } = this.props;
    const from = location.state
      ? location.state.from
      : "/";
    if (authenticated) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <div>{from === "/" ? null : "Please login before proceeding"}</div>
        <SigninForm onSubmit={this.handleLogin} errorMessage={errorMessage} />
      </div>
    );
  }
}

Signin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  authenticated: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  errorMessage: makeAuthErrorSelector(),
  authenticated: makeAuthTokenSelector(),
});

export default connect(mapStateToProps, { signIn })(Signin);
