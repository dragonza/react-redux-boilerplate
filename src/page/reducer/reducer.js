import defaultState from '../../store/default-state';

// function setState(state, newState) {
//   return state.merge(newState);
// }
export default function(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
