import { getType } from 'typesafe-actions';
import { RootAction } from 'typesafe-actions/dist/create-reducer';
import { fetchSettingsByGroup, saveSettings } from '../actions/settings-actions';
import { SettingsFormModel } from '../../model/form/settings-from-model';

const getSettingsReducer = (
  state: SettingsFormModel | null = null,
  action: RootAction
): SettingsFormModel | null => {
  switch (action.type) {
    case getType(fetchSettingsByGroup.request):
      return state;
    case getType(fetchSettingsByGroup.success):
      return action.payload;
    case getType(fetchSettingsByGroup.failure):
      return state;
    case getType(saveSettings.request):
      return state;
    case getType(saveSettings.success):
      return action.payload;
    case getType(saveSettings.failure):
      return state;
    default:
      return state;
  }
};
export default getSettingsReducer;
