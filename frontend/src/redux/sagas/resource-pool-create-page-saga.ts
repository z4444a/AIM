import httpClientService from '../../commons/services/http-client.service';
import { AxiosResponse } from 'axios';
import {
  createNewResourcePool,
  fetchResourceTypesSuggestions,
} from '../actions/resource-pool-create-page-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { hidePortalOverlay, showPortalOverlay } from '../actions/portal-actions';
import { push } from 'connected-react-router';
import { Path } from '../../commons/path';

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

export function* createResourcePool(
  action: ReturnType<typeof createNewResourcePool.request>
): SagaIterator {
  yield put(showPortalOverlay());
  try {
    const data = yield call(() =>
      httpClientService
        .post('pools', action.payload)
        .then((response: AxiosResponse) => response.data)
    );

    yield put(createNewResourcePool.success(data));
    yield put(push(Path.RESOURCE_POOLS));
  } catch (error) {
    put(createNewResourcePool.failure(error));
  } finally {
    yield put(hidePortalOverlay());
  }
}

export function* watchCreateResPoolResourceTypeSuggestion() {
  yield takeLatest(fetchResourceTypesSuggestions.request, requestAllActiveResourceTypes);
}

export function* watchCreateNewResourcePool() {
  yield takeLatest(createNewResourcePool.request, createResourcePool);
}
