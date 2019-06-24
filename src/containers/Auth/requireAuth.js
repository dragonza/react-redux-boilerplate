import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { makeAuthTokenSelector } from "./auth-selector";

export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { token, history } = this.props;
      if (!token.length) {
        history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  const mapStateToProps = createStructuredSelector({
    token: makeAuthTokenSelector(),
  });

  return connect(mapStateToProps)(ComposedComponent);
};
