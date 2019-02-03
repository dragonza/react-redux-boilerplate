import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import LaneItem from './LaneItem';

const LaneList = ({ laneList, className, onDeleteLane }) => {
  if (!laneList) return null;
  return (
    <ul className={className}>
      {laneList
        // .valueSeq()
        .map(lane => (
          <LaneItem
            key={lane.get('id')}
            lane={lane}
            onDeleteLane={onDeleteLane}
          />
        ))}
    </ul>
  );
};
//
// <LaneItem
//   key={lane.get("id")}
//   lane={lane}
//   onDeleteLane={onDeleteLane}
// />

LaneList.propTypes = {
  onDeleteLane: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  laneList: PropTypes.instanceOf(Immutable.List).isRequired
};

export default LaneList;
