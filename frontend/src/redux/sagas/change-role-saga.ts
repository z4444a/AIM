import { changeRole } from '../actions/full-employee-action';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import httpClientService from '../../commons/services/http-client.service';

export function* requestChangeRole(action: ReturnType<typeof changeRole.request>): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .put(
          'employees/' + action.payload.id + '/role',
          {},
          {
            params: {
              roleId: action.payload.roleId,
            },
          }
        )
        .then((response: AxiosResponse) => response.data)
    );

    yield put(changeRole.success(data));
  } catch (error) {
    put(changeRole.failure(error));
  }
}

export function* watchChangeRole() {
  yield takeLatest(changeRole.request, requestChangeRole);
}
