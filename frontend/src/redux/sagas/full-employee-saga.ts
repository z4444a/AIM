import { AxiosResponse } from 'axios';
import { fetchFullEmployees } from '../actions/full-employee-action';
import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import httpClientService from '../../commons/services/http-client.service';

export function* requestFullEmployees(
  action: ReturnType<typeof fetchFullEmployees.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('employees', {
          params: action.payload,
        })
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchFullEmployees.success(data));
  } catch (error) {
    yield put(fetchFullEmployees.failure(error));
  }
}

export function* watchFetchFullEmployees() {
  yield takeLatest(fetchFullEmployees.request, requestFullEmployees);
}
