import { createAction } from 'typesafe-actions';
import { FormData } from '../../modules/login/components/login-form/login-form';

export const updateFormValues = createAction('LOGIN_PAGE/UPDATE_FORM_VALUES', action => {
  return (data: FormData) => action(data);
});
export const toggleShowPwd = createAction('LOGIN_PAGE/TOGGLE_SHOW_PWD');
export const toggleInvalidAuth = createAction('LOGIN_PAGE/TOGGLE_INVALID_AUTH');
export const resetLoginForm = createAction('LOGIN_PAGE/RESET_LOGIN_FORM');
