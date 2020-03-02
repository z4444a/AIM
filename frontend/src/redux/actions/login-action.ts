import { createAsyncAction } from 'typesafe-actions';
import { AuthState } from '../../modules/login/features/login-page/login-page';
import { AuthenticationProps } from '../../modules/login/features/login-page/login-page';

enum LoginActionType {
  LOGIN_REQUEST = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}
export const LoginAction = createAsyncAction(
  LoginActionType.LOGIN_REQUEST,
  LoginActionType.LOGIN_SUCCESS,
  LoginActionType.LOGIN_FAILURE
)<AuthState, AuthenticationProps, Error | void>();
