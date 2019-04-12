import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

class NoteList extends React.PureComponent {
  render() {
    const { noteListIds, className, onDetachNoteFromLane } = this.props;
    return (
      <div className={className}>
        {noteListIds.map(id => (
          <NoteItem
            key={id}
            noteId={id}
            onDetachNoteFromLane={onDetachNoteFromLane}
          />
        ))}
      </div>
    );
  }
}

NoteList.propTypes = {
  onDetachNoteFromLane: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  noteListIds: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default NoteList;
