import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import Editable from '../../../components/Editable';
import NoteList from '../noteList/NoteList';
import { addNote, deleteNote } from '../noteList/note-action';
import { detachFromLane, attachNoteToLane, updateLane } from './lane-action';

class LaneItem extends PureComponent {
  state = {
    editing: false,
  };

  handleOnEdit = () => {
    this.setState({ editing: true });
  };

  handleSave = text => {
    if (!text.length) return null;
    const { lane, updateLane } = this.props;
    updateLane(lane.get('id'), text);
    return this.setState({ editing: false });
  };

  handleAddNote = () => {
    const { addNote, attachNoteToLane, lane } = this.props;
    const id = uuid();
    const newTask = {
      task: 'New Task',
      id,
    };
    addNote(newTask);
    attachNoteToLane(lane.get('id'), id);
  };

  handleDeleteLane = () => {
    const { lane, onDeleteLane, deleteNote } = this.props;
    onDeleteLane(lane.get('id'));
    deleteNote(lane.get("notes").toJS());
  };

  handleDetachNote = noteId => {
    const { detachFromLane, lane } = this.props;
    detachFromLane(lane.get('id'), noteId);
  };

  renderComponent = (props, state) => {
    const { lane } = props;
    // console.log('LaneItem render ==>', lane.get('id'));
    // if (!lane) return null;
    return (
      <div className="lane-item">
        <div className="lane-header">
          <button
            type="button"
            className="add-note lane-header-item"
            onClick={this.handleAddNote}
          >
            +
          </button>
          <Editable
            value={lane.get('name')}
            editing={state.editing}
            onEdit={this.handleOnEdit}
            className="lane-header-item lane-editable"
            onSave={this.handleSave}
          />
          <button
            type="button"
            className="delete-note lane-header-item"
            onClick={this.handleDeleteLane}
          >
            x
          </button>
        </div>
        <NoteList
          onDetachNoteFromLane={this.handleDetachNote}
          noteListIds={lane.get('notes')}
          className="notes-list note-header-item"
        />
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default connect(
  null,
  {
    addNote,
    detachFromLane,
    attachNoteToLane,
    updateLane,
    deleteNote,
  },
)(LaneItem);

LaneItem.propTypes = {
  onDeleteLane: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  detachFromLane: PropTypes.func.isRequired,
  attachNoteToLane: PropTypes.func.isRequired,
  updateLane: PropTypes.func.isRequired,
  lane: PropTypes.object.isRequired,
};
