import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeNoteListSelector } from "../noteList/noteList-selector";
import Editable from "../../../components/Editable";
import NoteList from "../noteList/NoteList";
import {
  updateLane,
  attachNoteToLane,
  moveNote,
  detachFromLane
  // arrangeNote
} from "./lane-action";
import { addNote, deleteNote } from "../noteList/note-action";
import { createStructuredSelector } from "reselect";

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
    const { addNote, attachNoteToLane, lane } = this.props;
    const newTask = addNote("New Task");
    attachNoteToLane(lane.get("id"), newTask.payload.get("id"));
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
          noteList={props.noteListByLane}
          className="notes-list lane-header-item"
          onDeleteNote={this.handleDeleteNote}
        />
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}
const mapStateToProps = createStructuredSelector({
  noteListByLane: makeNoteListSelector()
});
// const makeMapStateToProps = () => {
//   const getNoteListByLane = makeNoteListSelector();
//   return (state, props) => {
//     return {
//       noteListByLane: getNoteListByLane(state, props)
//     };
//   };
// };

export default connect(
  mapStateToProps,
  {
    updateLane,
    addNote,
    deleteNote,
    attachNoteToLane,
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
