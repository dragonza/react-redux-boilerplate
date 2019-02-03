import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Immutable from "immutable";
import LaneList from "./laneList/LaneList";
import {
  makeKanbanErrorSelector,
  makeKanbanLoadingSelector,
  makeLaneListSelector
} from "./laneList/laneList-selector";
import { createStructuredSelector } from 'reselect';
import { addLane, deleteLane, moveNote } from "./laneList/lane-action";
import { fetchKanban } from "./kanban-action";

class KanbanBoard extends Component {
  componentDidMount() {
    this.props.fetchKanban();
  }
  handleAddLane = () => {
    this.props.addLane("New Lane");
  };

  handleDeleteLane = id => {
    this.props.deleteLane([id]);
  };

  renderComponent = props => {
    const { laneList } = props;
    return (
      <div className="kanban-app">
        <button className="add-lane" onClick={this.handleAddLane}>
          +
        </button>
        <LaneList
          className="lane-list"
          laneList={laneList}
          onDeleteLane={this.handleDeleteLane}
        />
      </div>
    );
  };

  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }
    return this.renderComponent(this.props, this.state);
  }
}
const mapStateToProps = createStructuredSelector({
  laneList: makeLaneListSelector(),
  loading: makeKanbanLoadingSelector(),
  error: makeKanbanErrorSelector()
});
// const makeMapStateToProps = () => {
//   const getLaneListState = makeLaneListSelector();
//   const getKanbanLoading = makeKanbanLoadingSelector();
//   const getKanbanError = makeKanbanErrorSelector();
//   return state => {
//     return {
//       laneList: getLaneListState(state),
//       loading: getKanbanLoading(state),
//       error: getKanbanError(state)
//     };
//   };
// };

export default connect(
  mapStateToProps,
  {
    addLane,
    deleteLane,
    moveNote,
    fetchKanban
  }
)(KanbanBoard);

KanbanBoard.propTypes = {
  addLane: PropTypes.func.isRequired,
  deleteLane: PropTypes.func.isRequired,
  laneList: PropTypes.instanceOf(Immutable.List).isRequired
};
