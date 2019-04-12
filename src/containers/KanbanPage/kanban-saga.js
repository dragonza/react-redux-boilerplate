import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchKanbanSuccess, fetchKanbanFailed } from './kanban-action';
import { UPDATE, FETCH_KANBAN_SUCCESS, FETCH_KANBAN_FAILED } from './constant';
import apiRequest from '../../store/request';

function* handleFetchKanban() {
  try {
    const requestUrl = 'https://my-json-server.typicode.com/dragonza/demo/db';
    const response = yield call(apiRequest, requestUrl);
    yield put(
      fetchKanbanSuccess(FETCH_KANBAN_SUCCESS, {
        ...response.data,
        loading: false,
      }),
    );
  } catch (e) {
    yield put(
      fetchKanbanFailed(FETCH_KANBAN_FAILED, { error: e, loading: false }),
    );
  }
}


export default function* kanbanSaga() {
  yield takeEvery(`${UPDATE}/LOAD_KANBAN`, handleFetchKanban);
}
