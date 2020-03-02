import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import { fetchAllRequests } from '../actions/request-actions';
import httpClientService from '../../commons/services/http-client.service';
import {
  acceptRequestAction,
  closeRequestAction,
  fetchParameterValues,
  fetchRequestAction,
  fetchRequestHistory,
  pauseRequestAction,
  poolCapacityIsNotEnough,
  rejectRequestAction,
  resumeRequestAction,
} from '../actions/request-accept-page-action';
import { CommentGetModel } from '../../model/get/comment-get-model';
import { leaveCommentAction } from '../actions/comment-actions';
import { RequestStatusChangeGetModel } from '../../model/get/request-status-change-get-model';

export function* requestAllRequests(
  action: ReturnType<typeof fetchAllRequests.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('requests', {
          params: action.payload,
        })
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchAllRequests.success(data));
  } catch (error) {
    put(fetchAllRequests.failure(error));
  }
}

export function* fetchRequest(action: ReturnType<typeof fetchRequestAction.request>): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get(`requests/${action.payload}`)
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchRequestAction.success(data));
  } catch (error) {
    yield put(fetchRequestAction.failure(error));
  }
}

export function* fetchRequestValues(
  action: ReturnType<typeof fetchParameterValues.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get(`requests/${action.payload}/values`)
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchParameterValues.success(data));
  } catch (error) {
    yield put(fetchParameterValues.failure(error));
  }
}

interface AcceptanceStatusModel {
  capacityEnough: boolean;
}

export function* acceptRequest(
  action: ReturnType<typeof acceptRequestAction.request>
): SagaIterator {
  try {
    const data: AcceptanceStatusModel = yield call(() =>
      httpClientService
        .put(`requests/${action.payload.id}/accept`, action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    if (data.capacityEnough) {
      yield put(acceptRequestAction.success());
    } else {
      yield put(poolCapacityIsNotEnough());
    }
  } catch (error) {
    yield put(acceptRequestAction.failure(error));
  }
}

export function* pauseRequest(action: ReturnType<typeof pauseRequestAction.request>): SagaIterator {
  try {
    const status = yield call(() =>
      httpClientService
        .delete(`requests/${action.payload}/pause`)
        .then((response: AxiosResponse) => response.status)
    );
    if (status === 200) {
      yield put(pauseRequestAction.success());
    }
  } catch (error) {
    yield put(pauseRequestAction.failure(error));
  }
}

export function* closeRequest(action: ReturnType<typeof closeRequestAction.request>): SagaIterator {
  try {
    const status = yield call(() =>
      httpClientService
        .delete(`requests/${action.payload}/close`)
        .then((response: AxiosResponse) => response.status)
    );
    if (status === 200) {
      yield put(closeRequestAction.success());
    }
  } catch (error) {
    yield put(closeRequestAction.failure(error));
  }
}

export function* resumeRequest(
  action: ReturnType<typeof resumeRequestAction.request>
): SagaIterator {
  try {
    const status = yield call(() =>
      httpClientService
        .delete(`requests/${action.payload}/resume`)
        .then((response: AxiosResponse) => response.status)
    );
    if (status === 200) {
      yield put(resumeRequestAction.success());
    }
  } catch (error) {
    yield put(resumeRequestAction.failure(error));
  }
}

export function* rejectRequest(
  action: ReturnType<typeof rejectRequestAction.request>
): SagaIterator {
  try {
    const data: CommentGetModel = yield call(() =>
      httpClientService
        .put(`requests/${action.payload.requestId}/reject`, action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(rejectRequestAction.success());
    yield put(leaveCommentAction.success(data));
  } catch (error) {
    yield put(rejectRequestAction.failure(error));
  }
}

export function* fetchHistory(
  action: ReturnType<typeof fetchRequestHistory.request>
): SagaIterator {
  try {
    const data: RequestStatusChangeGetModel[] = yield call(() =>
      httpClientService
        .get(`requests/${action.payload}/history`)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchRequestHistory.success(data));
  } catch (error) {
    yield put(fetchRequestHistory.failure(error));
  }
}

export function* watchFetchRequest() {
  yield takeLatest(fetchRequestAction.request, fetchRequest);
}

export function* watchFetchAllRequests() {
  yield takeLatest(fetchAllRequests.request, requestAllRequests);
}

export function* watchAcceptRequest() {
  yield takeLatest(acceptRequestAction.request, acceptRequest);
}

export function* watchRejectRequest() {
  yield takeLatest(rejectRequestAction.request, rejectRequest);
}

export function* watchPauseRequest() {
  yield takeLatest(pauseRequestAction.request, pauseRequest);
}

export function* watchCloseRequest() {
  yield takeLatest(closeRequestAction.request, closeRequest);
}

export function* watchResumeRequest() {
  yield takeLatest(resumeRequestAction.request, resumeRequest);
}

export function* watchFetchValues() {
  yield takeLatest(fetchParameterValues.request, fetchRequestValues);
}
export function* watchFetchHistory() {
  yield takeLatest(fetchRequestHistory.request, fetchHistory);
}
