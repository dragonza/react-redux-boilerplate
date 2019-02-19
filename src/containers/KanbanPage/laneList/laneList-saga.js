import { takeEvery, put } from "redux-saga/effects";
import { ADD_NOTE_SAGA } from "../noteList/constant";
import { addNoteToIdsList, addNoteToMap } from "../noteList/note-action";
import {attachNoteToLane, deleteLaneFromMap, deleteLaneIdFromList} from "../laneList/lane-action";

import uuid from "uuid/v4";
import { DELETE_LANE_SAGA } from "./constant";

function* handleAddNoteList(payload) {
  try {
    const id = uuid();
    const newNote = {
      id,
      task: payload.task
    };
    yield put(addNoteToIdsList(id));
    yield put(addNoteToMap(newNote));
    yield put(attachNoteToLane(payload.laneId, id));
  } catch (e) {}
}

function* handleDeleteLane(payload) {
  try {
    yield put(deleteLaneIdFromList(payload.laneId));
    yield put(deleteLaneFromMap(payload.laneId));
  } catch(e) {

  }
}

export default function* laneListSaga() {
  yield takeEvery(ADD_NOTE_SAGA, handleAddNoteList);
  yield takeEvery(DELETE_LANE_SAGA, handleDeleteLane);
}
