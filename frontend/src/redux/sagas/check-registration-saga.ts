import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import { LoadingAction } from '../actions/loading-actions';
import httpClientService from '../../commons/services/http-client.service';

export function* checkRegistrationRequest(): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService.get('init-admin').then((response: AxiosResponse) => response.data)
    );
    yield put(LoadingAction.success(data));
  } catch (error) {
    put(LoadingAction.failure(error));
  }
}

export function* watchCheckRegistration() {
  yield takeLatest(LoadingAction.request, checkRegistrationRequest);
}
