import { OrderedMap} from "immutable";

const INITIAL_STATE = {
  "0": {
    id: "0",
    notes: ["0"],
    name: "To do"
  },
  "1": {
    id: "1",
    notes: ["1"],
    name: "In Progress"
  }
};
export default (state = OrderedMap(INITIAL_STATE), action) => {
  switch (action.type) {
    // case "CREATE_LANE_TEST":
    //   return state.set(action.payload.id, fromJS(action.payload));
    default:
      return state;
  }
};
