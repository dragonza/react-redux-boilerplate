import React, { Component } from "react";
import LaneList from "./laneList/LaneList";
import { connect } from 'react-redux';
import { fetchKanban, addLane } from "./kanban-action";

class KanbanBoard extends Component {
  handleAddLane = () => {
    this.props.addLane('New Lane')
  };

  render() {
    console.log("kanban render");
    return (
      <div className="kanban-app">
        <button className="add-lane" onClick={this.handleAddLane}>
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
