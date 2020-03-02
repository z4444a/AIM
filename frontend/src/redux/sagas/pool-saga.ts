import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import { fetchPool, updatePool } from '../actions/pool-action';
import httpClientService from '../../commons/services/http-client.service';
import {
  setResourceType,
  updatePoolParametersValues,
  updateResourcePoolFormModel,
} from '../actions/resource-pool-create-page-actions';
import { PoolGetModel } from '../../model/get/pool-get-model';
import { hidePortalOverlay, showPortalOverlay } from '../actions/portal-actions';
import { push } from 'connected-react-router';
import { Path } from '../../commons/path';
import {
  fetchPoolAllocationSuggestions,
  fetchPoolTypedSuggestions,
} from '../actions/request-accept-page-action';
import NamedModel from '../../model/base/named-model';
import { NamedTypedModel } from '../../model/get/named-typed-model';
import { takeEvery } from 'redux-saga/effects';

export function* poolFetchRequest(action: ReturnType<typeof fetchPool.request>): SagaIterator {
  try {
    const data: PoolGetModel = yield call(() =>
      httpClientService
        .get('pools/' + action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchPool.success(data));
    const type = yield call(() =>
      httpClientService
        .get('/resource-types/' + data.resourceType.id)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(updateResourcePoolFormModel(data));
    yield put(updatePoolParametersValues(data.parametersValues));
    yield put(setResourceType(type));
  } catch (error) {
    put(fetchPool.failure(error));
  }
}

export function* poolUpdateRequest(action: ReturnType<typeof updatePool.request>): SagaIterator {
  try {
    yield put(showPortalOverlay());
    const data = yield call(() =>
      httpClientService
        .put('pools/' + action.payload.id, action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(updatePool.success(data));
    yield put(push(Path.RESOURCE_POOLS));
  } catch (error) {
    put(updatePool.failure(error));
  } finally {
    yield put(hidePortalOverlay());
  }
}

export function* fetchPoolAllocationSuggestion(
  action: ReturnType<typeof fetchPoolAllocationSuggestions.request>
): SagaIterator {
  try {
    const data: NamedModel[] = yield call(() =>
      httpClientService
        .get('pools/allocation-suggestions', {
          params: {
            requestId: action.payload,
          },
        })
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchPoolAllocationSuggestions.success(data));
  } catch (error) {
    put(fetchPoolAllocationSuggestions.failure(error));
  }
}

export function* fetchPoolTypedSuggestion(
  action: ReturnType<typeof fetchPoolTypedSuggestions.request>
): SagaIterator {
  try {
    const data: NamedTypedModel[] = yield call(() =>
      httpClientService
        .get('pools/typed-suggestions', {
          params: {
            typeId: action.payload,
          },
        })
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchPoolTypedSuggestions.success(data));
  } catch (error) {
    put(fetchPoolTypedSuggestions.failure(error));
  }
}

export function* watchFetchPool() {
  yield takeLatest(fetchPool.request, poolFetchRequest);
}

export function* updatePoolByData() {
  yield takeLatest(updatePool.request, poolUpdateRequest);
}

export function* watchFetchPoolAllocationSuggestions() {
  yield takeLatest(fetchPoolAllocationSuggestions.request, fetchPoolAllocationSuggestion);
}

export function* watchFetchPoolTypedSuggestions() {
  yield takeEvery(fetchPoolTypedSuggestions.request, fetchPoolTypedSuggestion);
}
