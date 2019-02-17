import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

const NoteList = ({ className, noteListIds, onDeleteNote, onMoveNote }) => {
  return (
    <div className={className}>
      {noteListIds.map(noteId => (
        <NoteItem
          onMoveNote={onMoveNote}
          noteId={noteId}
          id={noteId}
          key={noteId}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
};

NoteList.propTypes = {
  onMoveNote: PropTypes.func,
  onDeleteNote: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  noteListIds: PropTypes.instanceOf(Immutable.List).isRequired
};

export default NoteList;
