import { getType, RootAction } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { updateSettings } from '../actions/settings-page-actions';
import { SettingsFormModel } from '../../model/form/settings-from-model';

const formModel = (state: SettingsFormModel = {}, action: RootAction) => {
  switch (action.type) {
    case getType(updateSettings):
      return action.payload;
    default:
      return state;
  }
};

const settingsPage = combineReducers({
  formModel,
});

export default settingsPage;
