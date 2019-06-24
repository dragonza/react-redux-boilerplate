import React from "react";
import { reduxForm, Field } from "redux-form/immutable";
import PropTypes from 'prop-types';
import InputField from "../../../components/FormInputField";
import { errorsText } from "../auth-constant";
import { isValidEmail } from "../../../utils/validator";

class SigninForm extends React.Component {
  renderFields = () => {
    return (
      <React.Fragment>
        {/* <Field */}
        {/*  key="username" */}
        {/*  component={InputField} */}
        {/*  type="text" */}
        {/*  label="Username" */}
        {/*  name="username" */}
        {/* /> */}
        <Field
          key="email"
          component={InputField}
          type="email"
          label="Email"
          name="email"
        />
        <Field
          key="password"
          component={InputField}
          type="password"
          label="Password"
          name="password"
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
          Login
        </button>
      </form>
    );
  }
}

const validate = values => {
  // TODO: review this
  const errors = {};

  if (!values.get('password')) {
    errors.password = errorsText.requireField;
  }

  if (!values.get('email')) {
    errors.email = errorsText.requireField
  } else if (
    !isValidEmail(values.get('email'))
  ) {
    errors.email = 'Invalid email address'
  }

  return errors;
};


SigninForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default reduxForm({
  form: "signInForm",
  validate,
})(SigninForm);
