import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { createType, fetchType } from '../actions/type-action';
import httpClientService from '../../commons/services/http-client.service';
import { hidePortalOverlay, showPortalOverlay } from '../actions/portal-actions';
import { push } from 'connected-react-router';
import { Path } from '../../commons/path';
import { updateResourceType } from '../actions/resource-type-actions';
import {
  checkUniqueTypeName,
  resetFormModel,
  resetHighlightEmpty,
  setParameterFormModels,
} from '../actions/resource-type-page-actions';
import { TypeGetModel } from '../../model/get/type-get-model';
import { checkTypeName } from '../actions/exists-type-name-action';

export function* typeCreateRequest(action: ReturnType<typeof createType.request>): SagaIterator {
  try {
    yield put(showPortalOverlay());
    const data = yield call(() =>
      httpClientService
        .post('resource-types', action.payload)
        .then((response: AxiosResponse) => response.data)
    );

    yield put(createType.success(data));
    yield put(push(Path.RESOURCE_TYPES));
    yield put(resetFormModel());
    yield put(resetHighlightEmpty());
  } catch (error) {
    put(createType.failure(error));
  } finally {
    yield put(hidePortalOverlay());
  }
}

export function* updateTypeRequest(
  action: ReturnType<typeof updateResourceType.request>
): SagaIterator {
  try {
    yield put(showPortalOverlay());
    const data = yield call(() =>
      httpClientService
        .put(`resource-types/${action.payload.id}`, action.payload)
        .then((response: AxiosResponse) => response.data)
    );

    yield put(updateResourceType.success(data));
    yield put(push(Path.RESOURCE_TYPES));
    yield put(resetFormModel());
    yield put(resetHighlightEmpty());
  } catch (error) {
    put(updateResourceType.failure(error));
  } finally {
    yield put(hidePortalOverlay());
  }
}

export function* typeFetchRequest(action: ReturnType<typeof fetchType.request>): SagaIterator {
  try {
    const data: TypeGetModel = yield call(() =>
      httpClientService
        .get('resource-types/' + action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(setParameterFormModels(data.parameters));
    const parameters = data.parameters.map((value, index) => ({
      key: index,
      ...value,
    }));
    data.parameters = parameters;
    yield put(fetchType.success(data));
  } catch (error) {
    put(fetchType.failure(error));
  }
}

export function* checkTypeByNameRequest(
  action: ReturnType<typeof checkTypeName.request>
): SagaIterator {
  if (!action.payload) {
    yield put(checkUniqueTypeName(false));
  } else {
    try {
      const data = yield call(() =>
        httpClientService
          .get('resource-types/exists/' + action.payload)
          .then((response: AxiosResponse) => response.data)
      );
      yield put(checkUniqueTypeName(data));
    } catch (error) {
      put(fetchType.failure(error));
    }
  }
}

export function* createTypeByData() {
  yield takeLatest(createType.request, typeCreateRequest);
}

export function* watchUpdateType() {
  yield takeLatest(updateResourceType.request, updateTypeRequest);
}

export function* watchFetchType() {
  yield takeLatest(fetchType.request, typeFetchRequest);
}

export function* checkTypeByName() {
  yield takeLatest(checkTypeName.request, checkTypeByNameRequest);
}
