import { takeEvery } from 'redux-saga/effects';
import actions from '../actions/index';
import localStorageHelperService from '../../commons/services/local-storage-helper-service';

export function logoutRequest(): void {
  localStorageHelperService.removeRefreshToken();
  localStorageHelperService.removeAccessToken();
  localStorageHelperService.removeUserInfo();
}

export function* watchLogout() {
  yield takeEvery(actions.logout.logout, logoutRequest);
}
