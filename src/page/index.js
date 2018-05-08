import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LaneList from './components/lane-list';
import { laneListSelector } from './selectors/selectors';
import { addLane, deleteLane, moveNote } from './action/lane-action';

class Todo extends Component {
  handleAddLane = () => {
    this.props.addLane('New Lane');
  };

  handleDeleteLane = (id) => {
    this.props.deleteLane([id]);
  };

  renderComponent = (props) => {
    const { laneList } = props;
    return (
      <div className="kanban-app">
        <button className="add-lane" onClick={this.handleAddLane}>+</button>
        <LaneList
          className="lane-list"
          laneList={laneList}
          onDeleteLane={(id) => this.handleDeleteLane(id)}
        />
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default connect(
  (state, props) => {
    return {
      laneList: laneListSelector(state, props),
    };
  },
  (dispatch) => {
    return bindActionCreators({
      addLane,
      deleteLane,
      moveNote,
    }, dispatch);
  },
)(Todo);

Todo.propTypes = {
  addLane: PropTypes.func.isRequired,
  deleteLane: PropTypes.func.isRequired,
  laneList: PropTypes.array.isRequired,
};
