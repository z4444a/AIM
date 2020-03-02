import { createAction } from 'typesafe-actions';
import { FormData } from '../../modules/registration/components/registration-form/registration-form';

export const updateFormValues = createAction('REGISTRATION_PAGE/UPDATE_FORM_VALUES', action => {
  return (data: FormData) => action(data);
});
export const toggleShowPwd = createAction('REGISTRATION_PAGE/TOGGLE_SHOW_PWD');
export const toggleShowPwdConfirm = createAction('REGISTRATION_PAGE/TOGGLE_SHOW_PWD_CONFIRM');
export const resetRegistrationForm = createAction('REGISTRATION_PAGE/RESET_LOGIN_FORM');
