import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {makeNoteIdListByLane, makeNoteListSelector, noteIdListByLane} from "../noteList/noteList-selector";
import Editable from "../../../components/Editable";
import NoteList from "../noteList/NoteList";
import {
  updateLane,
  moveNote,
  detachFromLane
  // arrangeNote
} from "./lane-action";
import { addNote, deleteNote } from "../noteList/note-action";
import { createStructuredSelector } from "reselect";
import { makeLaneItemSelector } from './laneList-selector';


class LaneItem extends Component {
  state = {
    editing: false
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('this.props.lane === nextProps.lane', this.props.lane === nextProps.lane);
  //   return (
  //     this.props.lane !== nextProps.lane ||
  //     this.state.editing !== nextState.editing
  //   );
  // }

  handleOnEdit = () => {
    this.setState({ editing: true });
  };

  handleSave = text => {
    if (!text.length) return null;
    const { lane } = this.props;
    this.props.updateLane(lane.get("id"), text);
    this.setState({ editing: false });
    return true;
  };

  handleAddNoteButtonClick = () => {
    console.log('test', );
    const { addNote, lane } = this.props;
    addNote("New Task", lane.get("id"));
  };

  handleDeleteNote = id => {
    const { lane, deleteNote, detachFromLane } = this.props;
    deleteNote(id);
    detachFromLane(lane.get("id"), id);
  };

  handleDeleteLane = () => {
    const { lane, onDeleteLane, deleteNote } = this.props;
    onDeleteLane(lane.get("id"));
    lane.get("notes").forEach(note => deleteNote([note]));
  };

  // handleMoveNote = payload => {
  //   const { sourceId, targetId } = payload;
  //   this.props.moveNote({
  //     sourceId,
  //     targetId
  //   });
  // };

  renderComponent = (props, state) => {
    const { lane } = props;
    // if (!lane) return null;
    return (
      <div className="lane-item">
        <div className="lane-header">
          <button
            className="add-note lane-header-item"
            onClick={this.handleAddNoteButtonClick}
          >
            +
          </button>
          <Editable
            value={lane.get("name")}
            editing={state.editing}
            onEdit={this.handleOnEdit}
            className="lane-header-item lane-editable"
            onSave={this.handleSave}
          />
          <button
            className="delete-note lane-header-item"
            onClick={this.handleDeleteLane}
          >
            x
          </button>
        </div>

        <NoteList
          // onMoveNote={payload => this.handleMoveNote(payload)}
          noteListIds={props.noteIdListByLane}
          className="notes-list note-header-item"
          onDeleteNote={this.handleDeleteNote}
        />
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}
// const mapStateToProps = createStructuredSelector({
//   // noteListByLane: makeNoteListSelector(),
//   lane: makeLaneItemSelector()
// });
const mapStateToProps = createStructuredSelector({
  lane: makeLaneItemSelector(),
  // noteListByLane: makeNoteListSelector(),
  noteIdListByLane: makeNoteIdListByLane()
});

export default connect(
  mapStateToProps,
  {
    updateLane,
    addNote,
    deleteNote,
    detachFromLane,
    // arrangeNote,
    moveNote
  }
)(LaneItem);

LaneItem.propTypes = {
  moveNote: PropTypes.func.isRequired,
  updateLane: PropTypes.func.isRequired,
  lane: PropTypes.object.isRequired
};
