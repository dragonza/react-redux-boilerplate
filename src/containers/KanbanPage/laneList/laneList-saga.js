import { takeEvery, put } from "redux-saga/effects";
import { ADD_NOTE_SAGA } from "../noteList/constant";
import { updateNoteId, addNoteToMap } from "../noteList/note-action";
import { attachNoteToLane } from '../laneList/lane-action';

import uuid from 'uuid/v4';

function* handleAddNoteList(payload) {
  try {
    const id = uuid();
    const newNote = {
      id,
      task: payload.task
    };

    // yield put(updateNoteId(id));
    yield put(addNoteToMap(newNote));
    yield put(attachNoteToLane(payload.laneId, id))
  } catch (e) {

  }

}

export default function* laneListSaga() {
  yield takeEvery(ADD_NOTE_SAGA, handleAddNoteList);
}
