import { takeEvery, put, select } from 'redux-saga/effects';
import { moveNote, detachFromLane, attachNoteToLane, arrangeNote } from '../action/lane-action';
import { laneListSelector } from '../selectors/selectors';

function* handleMoveNote(payload) {
  const laneList = yield select(laneListSelector);
  const { sourceId, targetId } = payload;
  const sourceLane = laneList.find(lane => lane.notes.includes(sourceId));
  const sourceLaneId = sourceLane.id;
  const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
  const targetLane = targetId ? laneList.find(lane => lane.notes.includes(targetId)) : null;
  const targetLaneId = payload.targetLaneId ? payload.targetLaneId : targetLane.id;
  const targetNoteIndex = targetId ? targetLane.notes.indexOf(targetId) : null;


  if (targetLaneId === sourceLaneId) {
    return yield put(arrangeNote({ sourceNoteIndex, targetNoteIndex, laneId: sourceLaneId }));
  }
  yield put(attachNoteToLane(targetLaneId, sourceId));
  return yield put(detachFromLane(sourceLaneId, [sourceId]));
}


export default function* laneSaga() {
  yield takeEvery(moveNote().type, handleMoveNote);
}
