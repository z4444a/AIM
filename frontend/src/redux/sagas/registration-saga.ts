import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import { RegistrationAction } from '../actions/registration-action';
import { AuthenticationProps } from '../../modules/login/features/login-page/login-page';
import localStorageHelperService from '../../commons/services/local-storage-helper-service';
import httpClientService from '../../commons/services/http-client.service';

export function* registrationRequest(
  action: ReturnType<typeof RegistrationAction.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .post('init-admin', action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    const access = (data as AuthenticationProps).accessToken;
    if (access) {
      localStorageHelperService.setAccessToken(access);
    }
    const refresh = (data as AuthenticationProps).refreshToken;
    if (refresh) {
      localStorageHelperService.setRefreshToken(refresh);
    }
    yield put(RegistrationAction.success(data));
  } catch (error) {
    put(RegistrationAction.failure(error));
  }
}
export function* watchFetchRegistration() {
  yield takeLatest(RegistrationAction.request, registrationRequest);
}
