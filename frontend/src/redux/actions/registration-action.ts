import { createAsyncAction } from 'typesafe-actions';
import { AuthState } from '../../modules/login/features/login-page/login-page';
import { AuthenticationProps } from '../../modules/login/features/login-page/login-page';

enum RegistrationActionType {
  REGISTRATION_REQUEST = 'REGISTRATION',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE = 'REGISTRATION_FAILURE',
}
export const RegistrationAction = createAsyncAction(
  RegistrationActionType.REGISTRATION_REQUEST,
  RegistrationActionType.REGISTRATION_SUCCESS,
  RegistrationActionType.REGISTRATION_FAILURE
)<AuthState, AuthenticationProps, Error>();
