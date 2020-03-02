import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAllActiveResourceTypes,
  fetchAllResourceTypes,
  fetchResourceType,
  fetchResourceTypeSuggestions,
} from '../actions/resource-type-actions';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import httpClientService from '../../commons/services/http-client.service';

export function* requestAllResourceTypes(
  action: ReturnType<typeof fetchAllResourceTypes.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('resource-types', {
          params: action.payload,
        })
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchAllResourceTypes.success(data));
  } catch (error) {
    put(fetchAllResourceTypes.failure(error));
  }
}

export function* requestResourceType(
  action: ReturnType<typeof fetchResourceType.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('resource-types/' + action.payload)
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchResourceType.success(data));
  } catch (error) {
    put(fetchResourceType.failure(error));
  }
}

export function* requestResourceTypeSuggestions(
  action: ReturnType<typeof fetchResourceTypeSuggestions.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('resource-types', {
          params: action.payload,
        })
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchResourceTypeSuggestions.success(data));
  } catch (error) {
    put(fetchResourceTypeSuggestions.failure(error));
  }
}

export function* watchFetchAllResourceTypes() {
  yield takeLatest(fetchAllResourceTypes.request, requestAllResourceTypes);
}

export function* watchFetchResourceType() {
  yield takeLatest(fetchResourceType.request, requestResourceType);
}

export function* watchFetchResourceTypeSuggestion() {
  yield takeLatest(fetchResourceTypeSuggestions.request, requestResourceTypeSuggestions);
}

export function* requestAllActiveResourceTypes(): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('resource-types/active')
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchAllActiveResourceTypes.success(data));
  } catch (error) {
    put(fetchAllActiveResourceTypes.failure(error));
  }
}

export function* watchFetchAllActiveResourceTypes() {
  yield takeLatest(fetchAllActiveResourceTypes.request, requestAllActiveResourceTypes);
}
