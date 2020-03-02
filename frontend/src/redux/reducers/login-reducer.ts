import { AuthenticationProps } from '../../modules/login/features/login-page/login-page';
import localStorageHelperService from '../../commons/services/local-storage-helper-service';
import { RootAction } from 'typesafe-actions/dist/create-reducer';
import { getType } from 'typesafe-actions';
import { LoginAction } from '../actions/login-action';
import { RegistrationAction } from '../actions/registration-action';
import actions from '../actions/index';

const getInitialState = () => {
  const state = {
    accessToken: localStorageHelperService.getAccessToken(),
    refreshToken: localStorageHelperService.getRefreshToken(),
    user: localStorageHelperService.getUserInfo(),
    error: false,
  };
  return state as AuthenticationProps;
};

const authReducer = (
  state: AuthenticationProps | null = getInitialState(),
  action: RootAction
): AuthenticationProps | null => {
  switch (action.type) {
    case getType(LoginAction.request):
      return { accessToken: null, refreshToken: null, error: false, user: null };
    case getType(LoginAction.success):
      return { ...action.payload, error: false };
    case getType(LoginAction.failure):
      return { accessToken: null, refreshToken: null, error: true, user: null };
    case getType(RegistrationAction.success):
      return { ...action.payload, error: false };
    case getType(actions.logout.logout):
      return null;
    default:
      return state;
  }
};

export default authReducer;
