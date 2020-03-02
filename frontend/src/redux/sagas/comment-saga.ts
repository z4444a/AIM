import { call, put, takeLatest } from 'redux-saga/effects';
import httpClientService from '../../commons/services/http-client.service';
import { AxiosResponse } from 'axios';
import { leaveCommentAction } from '../actions/comment-actions';
import { SagaIterator } from 'redux-saga';

export function* leaveComment(action: ReturnType<typeof leaveCommentAction.request>): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .post('comments', action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(leaveCommentAction.success(data));
  } catch (error) {
    yield put(leaveCommentAction.failure(error));
  }
}
export function* watchLeaveComment() {
  yield takeLatest(leaveCommentAction.request, leaveComment);
}
