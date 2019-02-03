import { spawn } from 'redux-saga/effects';
import KanbanSaga from '../containers/KanbanPage/kanban-saga';

export default function* rootSaga() {
  yield spawn(KanbanSaga);
}
