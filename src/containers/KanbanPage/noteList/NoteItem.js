import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateNote } from "./note-action";
import Editable from "../../../components/Editable";

class NoteItem extends Component {
  state = {
    editing: false
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.props.note !== nextProps.note ||
  //     this.state.editing !== nextState.editing
  //   );
  // }

  handleOnEdit = () => {
    this.setState({ editing: true });
  };

  handleSave = text => {
    if (!text.length) {
      this.props.onDeleteNote([this.props.note.get("id")]);
    }

    this.props.updateNote(this.props.note.get("id"), text);
    this.setState({ editing: false });
    return true;
  };

  handleDeleteNoteButtonClick = () => {
    this.props.onDeleteNote([this.props.note.get("id")])
  };

  renderComponent = (props, state) => {
    const { note } = props;
    if (!note) return null;
    return (
      <div className="note-item">
        <Editable
          className='note-editable'
          value={note.get("task")}
          editing={state.editing}
          onEdit={this.handleOnEdit}
          onSave={this.handleSave}
        />
        <button
          className="delete-note"
          onClick={this.handleDeleteNoteButtonClick}
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
  null,
  {
    updateNote
  }
)(NoteItem);

NoteItem.propTypes = {
  onDeleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};
