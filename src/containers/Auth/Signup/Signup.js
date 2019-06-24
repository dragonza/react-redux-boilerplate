import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect/lib/index';
import { signUp } from '../auth-action';
import { makeAuthErrorSelector } from '../auth-selector';
import SignupForm from './SignupForm';

class Signup extends Component {
  handleSignUp = formProps => {
    const { signUp } = this.props;
    const user = {
      email: formProps.get('email'),
      password: formProps.get('password'),
    };
    console.log('user', user);
    signUp(user);
  };

  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <SignupForm onSubmit={this.handleSignUp} errorMessage={errorMessage} />
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

// export default compose(
//   connect(
//     mapStateToProps,
//     { signUp },
//   ),
//   reduxForm({ form: 'signup', destroyOnUnmount: false }),
// )(Signup);
export default connect(
  mapStateToProps,
  { signUp },
)(Signup);
