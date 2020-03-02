import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import { LoginAction } from '../actions/login-action';
import { AuthenticationProps } from '../../modules/login/features/login-page/login-page';
import localStorageHelperService from '../../commons/services/local-storage-helper-service';
import httpClientService from '../../commons/services/http-client.service';

export function* loginRequest(action: ReturnType<typeof LoginAction.request>): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .post('auth/login', action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    const authProps = data as AuthenticationProps;
    if (authProps.accessToken) {
      localStorageHelperService.setAccessToken(authProps.accessToken);
    }
    if (authProps.refreshToken) {
      localStorageHelperService.setRefreshToken(authProps.refreshToken);
    }
    if (authProps.user) {
      localStorageHelperService.setUserInfo(authProps.user);
    }
    yield put(LoginAction.success(data));
  } catch (error) {
    yield put(LoginAction.failure(error));
  }
}

export function* watchFetchLogin() {
  yield takeLatest(LoginAction.request, loginRequest);
}
