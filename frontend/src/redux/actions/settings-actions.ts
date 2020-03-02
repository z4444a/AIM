import { createAsyncAction } from 'typesafe-actions';
import { SettingsAsync } from './action-types';
import { SettingModel } from '../../model/base/setting-model';
import { SettingsFormModel } from '../../model/form/settings-from-model';

export const saveSettings = createAsyncAction(
  SettingsAsync.SETTINGS_SAVE,
  SettingsAsync.SETTINGS_SAVE_SUCCESS,
  SettingsAsync.SETTINGS_SAVE_FAILURE
)<SettingModel[], SettingsFormModel, Error>();

export const fetchSettingsByGroup = createAsyncAction(
  SettingsAsync.GET_SETTINGS_BY_GROUP,
  SettingsAsync.GET_SETTINGS_BY_GROUP_SUCCESS,
  SettingsAsync.GET_SETTINGS_BY_GROUP_FAILURE
)<string, SettingsFormModel, Error>();
