import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import FormInputField from '../../../components/FormInputField';
import { isValidEmail } from '../../../utils/validator';
import { commonRestrictions, errorsText } from '../auth-constant';

class SignupForm extends React.Component {
  renderFields = () => {
    return (
      <React.Fragment>
        {/* <Field */}
        {/*  key="username" */}
        {/*  component={InputField} */}
        {/*  type="text" */}
        {/*  label="Username" */}
        {/*  placeholder="Username" */}
        {/*  name="username" */}
        {/* /> */}
        <Field
          key="email"
          component={FormInputField}
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          name="email"
        />
        <Field
          key="password"
          component={FormInputField}
          type="password"
          placeholder="password"
          label="Password"
          name="password"
        />
        <Field
          key="passwordRepeated"
          component={FormInputField}
          type="password"
          placeholder="password"
          label="Password Confirmed"
          name="passwordRepeated"
        />
      </React.Fragment>
    );
  };

  renderError = () => {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }
    return null;
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {this.renderFields()}
        {this.renderError()}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          Sign up
        </button>
      </form>
    );
  }
}

function validate(values) {
  // TODO: review this
  const errors = {};

  if (!values.get('email')) {
    errors.email = errorsText.requireField;
  } else if (!isValidEmail(values.get('email'))) {
    errors.email = 'Invalid email address';
  }

  if (!values.get('password')) {
    errors.password = errorsText.requireField;
  } else if (
    values.get('password') &&
    values.get('password').length < commonRestrictions.passwordMinLength
  ) {
    errors.password = errorsText.passwordMinLength;
  }

  if (values.get('password') !== values.get('passwordRepeated')) {
    errors.passwordRepeated = errorsText.confirmPassWordNotMatch;
  }

  return errors;
}

export default reduxForm({
  form: 'signupForm',
  validate,
})(SignupForm);
