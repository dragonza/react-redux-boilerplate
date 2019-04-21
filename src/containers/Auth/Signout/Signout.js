import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signout } from "../auth-action";


class Signout extends Component {
  componentDidMount() {
    const { signout } = this.props;
    signout();
  }

  render() {
    return (
      <div>
        Sorry to see u go!
      </div>
    );
  }
}

Signout.propTypes = {
  signout: PropTypes.func.isRequired,
};

export default connect(null, { signout })(Signout);
