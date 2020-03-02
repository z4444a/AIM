import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createNewRequest,
  fetchAuthorSuggestions,
  fetchProjectSuggestions,
  fetchResourceTypesSuggestions,
} from '../actions/request-create-page-actions';
import httpClientService from '../../commons/services/http-client.service';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';

export function* requestAllActiveResourceTypes(): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('resource-types/active')
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchResourceTypesSuggestions.success(data));
  } catch (error) {
    yield put(fetchResourceTypesSuggestions.failure(error));
  }
}

export function* requestAllEmployees(): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService.get('employees/names').then((response: AxiosResponse) => response.data)
    );
    yield put(fetchAuthorSuggestions.success(data));
  } catch (error) {
    yield put(fetchAuthorSuggestions.failure(error));
  }
}

export function* createRequest(action: ReturnType<typeof createNewRequest.request>): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .post('requests', action.payload)
        .then((response: AxiosResponse) => response.data)
    );

    yield put(createNewRequest.success(data.id));
  } catch (error) {
    yield put(createNewRequest.failure(error));
  }
}

export function* projectSuggestions(): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService.get('projects/suggestions').then((response: AxiosResponse) => response.data)
    );
    yield put(fetchProjectSuggestions.success(data));
  } catch (error) {
    yield put(fetchProjectSuggestions.failure(error));
  }
}

export function* watchFetchProjectSuggestions() {
  yield takeLatest(fetchProjectSuggestions.request, projectSuggestions);
}
export function* watchCreateRequestResourceTypeSuggestion() {
  yield takeLatest(fetchResourceTypesSuggestions.request, requestAllActiveResourceTypes);
}
export function* watchCreateRequestAuthorSuggestion() {
  yield takeLatest(fetchAuthorSuggestions.request, requestAllEmployees);
}

export function* watchCreateNewRequest() {
  yield takeLatest(createNewRequest.request, createRequest);
}
