import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { signUp } from './auth-action';
import { makeAuthErrorSelector } from './auth-selector';

class Signup extends Component {
  onSubmit = formProps => {
    const { signUp } = this.props;
    signUp(formProps);
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;
    console.log('errorMessage', this.props);
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label htmlFor="email">
              Email
              <Field name="email" type="text" component="input" id="email" />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="password">password</label>
            <Field name="password" type="password" component="input" />
          </fieldset>
          {
            errorMessage && <div>{errorMessage}</div>
          }
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  errorMessage: makeAuthErrorSelector(),
});

export default compose(
  connect(
    mapStateToProps,
    { signUp },
  ),
  reduxForm({ form: 'signup', destroyOnUnmount: false }),
)(Signup);
