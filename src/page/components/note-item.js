import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateNote } from '../action/note-action';
import Editable from './editable';

class NoteItem extends Component {
  state = {
    editing: false
  };

  handleOnEdit = () => {
    this.setState({ editing: true });
  };

  handleSave = text => {
    if (!text.length) {
      this.props.onDeleteNote([this.props.note.get('id')]);
    }

    this.props.updateNote(this.props.note.get('id'), text);
    this.setState({ editing: false });
  };

  renderComponent = (props, state) => {
    const { note } = props;
    if (!note) return null;
    return (
      <div className="note-item">
        <Editable
          value={note.get('task')}
          editing={state.editing}
          onEdit={this.handleOnEdit}
          onSave={text => this.handleSave(text)}
        />
        <button
          className="delete-note"
          onClick={() => props.onDeleteNote([note.get('id')])}
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

export default connect(
  () => ({}),
  dispatch => {
    return bindActionCreators(
      {
        updateNote
      },
      dispatch
    );
  }
)(NoteItem);

NoteItem.propTypes = {
  onDeleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};
