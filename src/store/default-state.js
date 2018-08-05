/* eslint-disable */
import { fromJS } from 'immutable';
export default fromJS({
  noteList: {
    '0': {
      id: '0',
      task: 'Learn React'
    },
    '1': {
      id: '1',
      task: 'Writing'
    }
  },
  laneList: {
    '0': {
      id: '0',
      notes: ['0'],
      name: 'To do'
    },
    '1': {
      id: '1',
      notes: ['1'],
      name: 'In Progress'
    }
  }
});
