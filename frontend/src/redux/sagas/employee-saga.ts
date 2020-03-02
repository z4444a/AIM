import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAllEmployees } from '../actions/employee_action';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import httpClientService from '../../commons/services/http-client.service';
import { fetchEmployee } from '../actions/full-employee-action';

export function* requestAllEmployees(): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService.get('employees/names').then((response: AxiosResponse) => response.data)
    );

    yield put(fetchAllEmployees.success(data));
  } catch (error) {
    put(fetchAllEmployees.failure(error));
  }
}

export function* poolFetchEmployee(action: ReturnType<typeof fetchEmployee.request>): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('employees/' + action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchEmployee.success(data));
  } catch (error) {
    put(fetchEmployee.failure(error));
  }
}

export function* watchFetchEmployee() {
  yield takeLatest(fetchEmployee.request, poolFetchEmployee);
}

export function* watchFetchAllEmployees() {
  yield takeLatest(fetchAllEmployees.request, requestAllEmployees);
}
