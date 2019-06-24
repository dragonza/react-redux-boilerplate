import { spawn } from 'redux-saga/effects';
import kanbanSaga from '../containers/KanbanPage/kanban-saga';
import authSaga from '../containers/Auth/auth-saga';
import laneListSaga from '../containers/KanbanPage/laneList/laneList-saga';

export default function* rootSaga() {
  yield spawn(kanbanSaga);
  yield spawn(laneListSaga);
  yield spawn(authSaga);
}
