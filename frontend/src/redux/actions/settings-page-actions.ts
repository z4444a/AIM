import { createAction } from 'typesafe-actions';
import { SettingsFormModel } from '../../model/form/settings-from-model';

export const updateSettings = createAction('MAIL_SETTINGS_PAGE/UPDATE_SETTINGS', action => {
  return (data: SettingsFormModel) => action(data);
});

export const resetSettingsUpdateStatus = createAction(
  'MAIL_SETTINGS_PAGE/RESET_SETTINGS_UPDATE_STATUS'
);
