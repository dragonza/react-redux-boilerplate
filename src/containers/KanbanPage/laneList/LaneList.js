import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { createStructuredSelector } from 'reselect';
import LaneItem from './LaneItem';
import { makeLanesDataSelector } from './laneList-selector';
import { deleteLane } from './lane-action';

class LaneList extends React.PureComponent {
  handleDeleteLane = id => {
    const { deleteLane } = this.props;
    deleteLane([id]);
  };

  render() {
    const { lanesData } = this.props;
    // console.log('laneList Render ---->');
    return (
      <ul className="lane-list">
        {lanesData.valueSeq().map(lane => {
          return (
            <LaneItem
              key={lane.get('id')}
              lane={lane}
              onDeleteLane={this.handleDeleteLane}
            />
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  lanesData: makeLanesDataSelector(),
});

LaneList.propTypes = {
  lanesData: PropTypes.instanceOf(Immutable.Map).isRequired,
  deleteLane: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { deleteLane },
)(LaneList);
