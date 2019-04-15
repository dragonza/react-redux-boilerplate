/* eslint-disable */
import { fromJS } from "immutable";
export default fromJS({
  notes: {
    isFetching: false,
    error: false,
    data: {
      "0": {
        id: "0",
        task: "Learn React"
      },
      "1": {
        id: "1",
        task: "Writing"
      },
      "3": {
        id: "3",
        task: "Note 3"
      },
      "4": {
        id: "4",
        task: "Note 4"
      },
      "5": {
        id: "5",
        task: "Note 5"
      }
    }
  },
  lanes: {
    isFetching: false,
    error: false,
    byIds: ["0", "1"],
    data: {
      "0": {
        id: "0",
        notes: ["0", "5"],
        name: "First column"
      },
      "1": {
        id: "1",
        notes: ["1"],
        name: "Second column"
      },
      "3": {
        id: "3",
        notes: ["3"],
        name: "Second column"
      },
      "4": {
        id: "4",
        notes: ["4"],
        name: "Second column"
      }
    }
  },
  auth: {
    authenticated: localStorage.getItem('token') || '', // store token here
    errorMessage: '',
    loading: false,
  }
});
