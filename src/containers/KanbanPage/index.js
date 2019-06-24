import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LaneList from "./laneList/LaneList";
import { addLane } from "./kanban-action";

class KanbanBoard extends Component {
  handleAddLane = () => {
    const { addLane } = this.props;
    addLane("New Lane");
  };

  render() {
    console.log("kanban render");
    return (
      <div className="kanban-app">
        <button type="button" className="add-lane" onClick={this.handleAddLane}>
          +
        </button>
        <LaneList />
      </div>
    );
  }
}

export default connect(
  null,
  { addLane }
)(KanbanBoard);

KanbanBoard.propTypes = {
  addLane: PropTypes.func.isRequired
};
