import actions from '../actions';
import { combineReducers } from 'redux';
import { FormData } from '../../modules/registration/components/registration-form/registration-form';
import { getType, RootAction } from 'typesafe-actions';

const getInitialFormValues = () => {
  const data: FormData = {
    login: '',
    pwd: '',
    confirmPwd: '',
  };
  return data;
};

const formValues = (state: FormData = getInitialFormValues(), action: RootAction) => {
  switch (action.type) {
    case getType(actions.registrationPage.updateFormValues):
      return action.payload;
    case getType(actions.registrationPage.resetRegistrationForm):
      return getInitialFormValues();
    default:
      return state;
  }
};

const showPwd = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(actions.registrationPage.toggleShowPwd):
      return !state;
    case getType(actions.registrationPage.resetRegistrationForm):
      return false;
    default:
      return state;
  }
};

const showPwdConfirm = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(actions.registrationPage.toggleShowPwdConfirm):
      return !state;
    case getType(actions.registrationPage.resetRegistrationForm):
      return false;
    default:
      return state;
  }
};

const formPageReducer = combineReducers({
  formValues,
  showPwd,
  showPwdConfirm,
});

export default formPageReducer;
