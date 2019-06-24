import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { updateNote, deleteNote } from './note-action';
import Editable from '../../../components/Editable';
import { makeNoteSelector } from './note-selector';

class NoteItem extends PureComponent {
  state = {
    editing: false,
  };

  handleOnEdit = () => {
    this.setState({ editing: true });
  };

  handleSave = text => {
    const { deleteNote, note, updateNote } = this.props;
    if (!text.length) {
      deleteNote([note.get('id')]);
    }

    updateNote(note.get('id'), text);
    return this.setState({ editing: false });
  };

  handleDeleteNote = () => {
    const { deleteNote, note, onDetachNoteFromLane } = this.props;
    deleteNote([note.get('id')]);
    onDetachNoteFromLane(note.get('id'));
  };

  renderComponent = (props, state) => {
    const { note } = props;
    // console.log('note Item ===>>>', note.get('id'));
    return (
      <div className="note-item">
        <Editable
          className="note-editable"
          value={note.get('task')}
          editing={state.editing}
          onEdit={this.handleOnEdit}
          onSave={this.handleSave}
        />
        <button
          type="button"
          className="delete-note"
          onClick={this.handleDeleteNote}
        >
          x
        </button>
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

const mapStateToProps = createStructuredSelector({
  note: makeNoteSelector(),
});

export default connect(
  mapStateToProps,
  {
    updateNote,
    deleteNote,
  },
)(NoteItem);

NoteItem.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  onDetachNoteFromLane: PropTypes.func.isRequired,
  note: PropTypes.instanceOf(Map).isRequired,
};
