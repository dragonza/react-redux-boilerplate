import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import NoteItem from './note-item';

const NoteList = ({ className, noteList, onDeleteNote, onMoveNote }) => {
  return (
    <div className={className}>
      {noteList.map(note => (
        <NoteItem
          onMoveNote={onMoveNote}
          note={note}
          id={note.get('id')}
          key={note.get('id')}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
};

NoteList.propTypes = {
  onMoveNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  noteList: PropTypes.instanceOf(Immutable.List).isRequired
};

export default NoteList;
