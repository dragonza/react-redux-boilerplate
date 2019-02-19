import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import LaneItem from './LaneItem';
import {
  makeKanbanErrorSelector,
  makeKanbanLoadingSelector,
  makeLaneListIdsSelector,
  makeLaneListSelector
} from "./laneList-selector";
import connect from "react-redux/es/connect/connect";
import { createStructuredSelector } from "reselect";

class LaneList extends React.PureComponent {

  render() {
    const { laneListIds } = this.props;
    console.log('laneList Render ---->');
    return (
      <ul className="lane-list">
        {laneListIds
        // .valueSeq()
          .map(id =>{
            return (
              <LaneItem
                key={id}
                laneId={id}
                onDeleteLane={this.handleAddLane}
              />
            )
          })}
      </ul>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  laneListIds: makeLaneListIdsSelector()
});


export default connect(
  mapStateToProps,
)(LaneList);
