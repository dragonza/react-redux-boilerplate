import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import LaneItem from './lane-item';

const LaneList = ({ laneList, className, onDeleteLane }) => {
  if (!laneList) return null;
  return (
    <ul className={className}>
      {laneList
        .valueSeq()
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

LaneList.propTypes = {
  onDeleteLane: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  laneList: PropTypes.instanceOf(Immutable.Map).isRequired
};

export default LaneList;
