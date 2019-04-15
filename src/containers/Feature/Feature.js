import React, {Component} from 'react';
import PropTypes from 'prop-types';
import requireAuth from '../Auth/requireAuth';


class Feature extends Component {
  render() {
    return (
      <div>
        This is a Feature
      </div>
    );
  }
}

Feature.propTypes = {};

export default requireAuth(Feature);
