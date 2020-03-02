import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import httpClientService from '../../commons/services/http-client.service';
import {
  fetchAllocationParametersAction,
  fetchParametersRequest,
  fetchRequestParametersAction,
} from '../actions/request-accept-page-action';
import { ParameterModifier } from '../../model/parameter-modifier';
import { findParameterIdentifier, findParameterValue } from '../actions/resource-type-page-actions';
import { ValidationParameterResponse } from '../../model/validation-parameter-response';

export function* requestAllParameters(
  action: ReturnType<typeof fetchParametersRequest>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('parameters', {
          params: action.payload,
        })
        .then((response: AxiosResponse) => response.data)
    );
    if (action.payload.modifier) {
      switch (action.payload.modifier) {
        case ParameterModifier.ALLOCATION_PARAMETER:
          yield put(fetchAllocationParametersAction(data));
          break;
        case ParameterModifier.REQUEST_PARAMETER:
          yield put(fetchRequestParametersAction(data));
          break;
      }
    }
  } catch (error) {}
}

export function* isUsed(action: ReturnType<typeof findParameterValue.request>): SagaIterator {
  try {
    const data: { check: boolean } = yield call(() =>
      httpClientService
        .get(`parameters/${action.payload}/is-used`)
        .then((response: AxiosResponse) => response.data)
    );
    const response: ValidationParameterResponse = {
      id: action.payload,
      validationPassed: !data.check,
    };
    yield put(findParameterValue.success(response));
  } catch (error) {
    yield put(findParameterValue.failure(error));
  }
}

export function* checkIdentifierExistence(
  action: ReturnType<typeof findParameterIdentifier.request>
): SagaIterator {
  const { key, ...rest } = action.payload;
  try {
    const data: { check: boolean } = yield call(() =>
      httpClientService
        .get(`parameters/identifier`, {
          params: rest,
        })
        .then((response: AxiosResponse) => response.data)
    );
    const response: ValidationParameterResponse = {
      id: key,
      validationPassed: !data.check,
    };
    yield put(findParameterIdentifier.success(response));
  } catch (error) {
    yield put(findParameterIdentifier.failure(error));
  }
}

export function* watchRequestAllParameters() {
  yield takeEvery(fetchParametersRequest, requestAllParameters);
}

export function* watchIsParameterUsed() {
  yield takeLatest(findParameterValue.request, isUsed);
}

export function* watchIdentifierExistence() {
  yield takeLatest(findParameterIdentifier.request, checkIdentifierExistence);
}
