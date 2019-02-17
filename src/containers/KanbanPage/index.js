import React, { Component } from "react";
import LaneList from "./laneList/LaneList";
import { fetchKanban } from "./kanban-action";

class KanbanBoard extends Component {
  handleAddLane = () => {};

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

export default KanbanBoard;
