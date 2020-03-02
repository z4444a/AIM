import actions from '../actions';
import { combineReducers } from 'redux';
import { FormData } from '../../modules/login/components/login-form/login-form';
import { getType, RootAction } from 'typesafe-actions';

const getInitialFormValues = () => {
  const data: FormData = {
    login: '',
    pwd: '',
  };
  return data;
};

const formValues = (state: FormData = getInitialFormValues(), action: RootAction) => {
  switch (action.type) {
    case getType(actions.loginPage.updateFormValues):
      return action.payload;
    case getType(actions.loginPage.resetLoginForm):
      return getInitialFormValues();
    default:
      return state;
  }
};

const showPwd = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(actions.loginPage.toggleShowPwd):
      return !state;
    case getType(actions.loginPage.resetLoginForm):
      return false;
    default:
      return state;
  }
};

const showInvalidAuth = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(actions.loginPage.toggleInvalidAuth):
      return !state;
    case getType(actions.login.LoginAction.failure):
      return true;
    case getType(actions.loginPage.resetLoginForm):
      return false;
    default:
      return state;
  }
};

const formPageReducer = combineReducers({
  formValues,
  showPwd,
  showInvalidAuth,
});

export default formPageReducer;
