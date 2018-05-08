import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { noteListByLane } from '../selectors/selectors';
import Editable from './editable';
import NoteList from './note-list';
import { updateLane, attachNoteToLane, moveNote,
  detachFromLane, arrangeNote } from '../action/lane-action';
import { addNote, deleteNote } from '../action/note-action';

class LaneItem extends Component {
  state = {
    editing: false,
  }

  handleOnEdit = () => {
    this.setState({ editing: true });
  }

  handleSave = (text) => {
    if (!text.length) return null;
    const { lane } = this.props;
    this.props.updateLane(lane.id, text);
    this.setState({ editing: false });
    return true;
  }

  addNote = (props) => {
    const newTask = props.addNote('New Task');
    props.attachNoteToLane(props.lane.id, newTask.payload.id);
  }

  handleDeleteNote = (id, props) => {
    const { lane } = props;
    props.deleteNote(id);
    props.detachFromLane(lane.id, id);
  }

  deleteLane = (props) => {
    const { lane } = props;
    props.onDeleteLane(lane.id);
    lane.notes.forEach(note => props.deleteNote([note]));
  }

  handleMoveNote = (payload) => {
    const { sourceId, targetId } = payload;
    this.props.moveNote({
      sourceId,
      targetId,
    });
  }

  renderComponent = (props, state) => {
    const { lane } = props;
    if (!lane) return null;
    return (
      <div className="lane-item">
        <div className="lane-header">
          <button className="add-note lane-header-item" onClick={() => this.addNote(props)}>+</button>
          <Editable
            value={lane.name}
            editing={state.editing}
            onEdit={this.handleOnEdit}
            className="lane-header-item lane-editable"
            onSave={(text) => this.handleSave(text)}
          />
          <button className="delete-note lane-header-item" onClick={() => this.deleteLane(props)}>x</button>
        </div>

        <NoteList
          onMoveNote={(payload) => this.handleMoveNote(payload)}
          noteList={props.noteListByLane}
          className="notes-list lane-header-item"
          onDeleteNote={(id) => this.handleDeleteNote(id, props)}
        />
      </div>
    );
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default connect(
  (state, props) => {
    return {
      noteListByLane: noteListByLane(state, props),
    };
  },
  (dispatch) => {
    return bindActionCreators({
      updateLane,
      addNote,
      deleteNote,
      attachNoteToLane,
      detachFromLane,
      arrangeNote,
      moveNote,
    }, dispatch);
  },
)(LaneItem);

LaneItem.propTypes = {
  moveNote: PropTypes.func.isRequired,
  updateLane: PropTypes.func.isRequired,
  lane: PropTypes.object.isRequired,
};
