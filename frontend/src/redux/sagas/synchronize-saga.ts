import { call, put, takeLatest } from 'redux-saga/effects';
import { SynchronizeAction } from '../actions/synchronize-action';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import { fetchFullEmployees } from '../actions/full-employee-action';
import httpClientService from '../../commons/services/http-client.service';

export function* synchronizeRequest(
  action: ReturnType<typeof SynchronizeAction.request>
): SagaIterator {
  try {
    yield call(() =>
      httpClientService
        .get('employees/synchronize')
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchFullEmployees.request(action.payload));
  } catch (error) {
    yield put(SynchronizeAction.failure(error));
  }
}

export function* watchSync() {
  yield takeLatest(SynchronizeAction.request, synchronizeRequest);
}
