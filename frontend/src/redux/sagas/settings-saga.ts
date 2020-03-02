import { SagaIterator } from '@redux-saga/types';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import httpClientService from '../../commons/services/http-client.service';
import { AxiosResponse } from 'axios';
import { fetchSettingsByGroup, saveSettings } from '../actions/settings-actions';
import { updateSettings } from '../actions/settings-page-actions';
import { SettingModel } from '../../model/base/setting-model';
import { SettingsFormModel } from '../../model/form/settings-from-model';
import { hidePortalOverlay, showPortalOverlay } from '../actions/portal-actions';

function getSettingValueByKey(settings: SettingModel[], key: string) {
  const setting = settings.find(obj => obj.key === key);
  return setting !== undefined ? setting.value : '';
}

export function* requestSettingsByGroup(
  action: ReturnType<typeof fetchSettingsByGroup.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('settings/get/' + action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    const newData: SettingsFormModel = {
      server: getSettingValueByKey(data, 'mail.server'),
      port: getSettingValueByKey(data, 'mail.port'),
      protocol: getSettingValueByKey(data, 'mail.protocol'),
      fromEmail: getSettingValueByKey(data, 'mail.fromEmail'),
      password: getSettingValueByKey(data, 'mail.password'),
    };
    yield put(fetchSettingsByGroup.success(newData));
    yield put(updateSettings(newData));
  } catch (error) {
    yield put(fetchSettingsByGroup.failure(error));
  }
}

export function* requestSaveSettings(
  action: ReturnType<typeof saveSettings.request>
): SagaIterator {
  try {
    yield put(showPortalOverlay());
    const data = yield call(() =>
      httpClientService
        .post('settings/', action.payload)
        .then((response: AxiosResponse) => response.data)
    );
    yield put(saveSettings.success(data));
  } catch (error) {
    put(saveSettings.failure(error));
  } finally {
    yield put(hidePortalOverlay());
  }
}

export function* watchSaveSettings() {
  yield takeLatest(saveSettings.request, requestSaveSettings);
}

export function* watchFetchSettingsByGroup() {
  yield takeLatest(fetchSettingsByGroup.request, requestSettingsByGroup);
}
