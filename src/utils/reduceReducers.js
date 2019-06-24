/*
 * Reduce multiple reducers into a single reducer from left to right.
 * make sure that the first reducer in the list defines the initial state
 */
function reduceReducers(...reducers) {
  return (store, action) =>
    reducers.reduce((result, reducer) => reducer(result, action), store);
}

export { reduceReducers };
