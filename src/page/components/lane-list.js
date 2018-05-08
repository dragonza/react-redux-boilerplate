import React from 'react';
import PropTypes from 'prop-types';
import LaneItem from './lane-item';

const LaneList = ({ laneList, className, onDeleteLane }) => {
  if (!laneList) return null;
  return (
    <ul className={className}>
      {
        laneList.map(lane =>
          (<LaneItem
            key={lane.id}
            lane={lane}
            onDeleteLane={onDeleteLane}
          />))
      }
    </ul>
  );
};

LaneList.propTypes = {
  onDeleteLane: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  laneList: PropTypes.array.isRequired,
};

export default LaneList;
