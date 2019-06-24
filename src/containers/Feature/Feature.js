import React, {Component} from 'react';
import requireAuth from '../Auth/requireAuth';


class Feature extends Component {
  render() {
    return (
      <div>
        This is a Feature/ Protected page
      </div>
    );
  }
}

Feature.propTypes = {};

export default requireAuth(Feature);
