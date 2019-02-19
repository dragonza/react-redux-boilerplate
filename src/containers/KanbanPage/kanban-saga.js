import { call, put, takeEvery } from "redux-saga/effects";
import {fetchKanbanSuccess, fetchKanbanFailed, addLaneToIdsList} from "./kanban-action";
import { UPDATE, FETCH_KANBAN_SUCCESS, FETCH_KANBAN_FAILED } from "./constant";
import apiRequest from "../../store/request";
import { ADD_LANE_SAGA } from "./laneList/constant";
import {addLaneToMap} from "./kanban-action";
import { List } from 'immutable';
import uuid from "uuid/v4";

function* handleFetchKanban() {
  try {
    const requestUrl = "https://my-json-server.typicode.com/dragonza/demo/db";
    const response = yield call(apiRequest, requestUrl);
    yield put(
      fetchKanbanSuccess(FETCH_KANBAN_SUCCESS, {
        ...response.data,
        loading: false
      })
    );
  } catch (e) {
    yield put(
      fetchKanbanFailed(FETCH_KANBAN_FAILED, { error: e, loading: false })
    );
  }
}

function* handleAddLane(payload) {
  try {
    const id = uuid();
    const newLane = {
      id,
      notes: List([]),
      name: payload.name
    };
    yield put(addLaneToMap(newLane));
    yield put(addLaneToIdsList(id));
  } catch (e) {

  }

}


export default function* kanbanSaga() {
  yield takeEvery(`${UPDATE}/LOAD_KANBAN`, handleFetchKanban);
  yield takeEvery(ADD_LANE_SAGA, handleAddLane);
}
