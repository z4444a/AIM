import { getType, RootAction } from 'typesafe-actions';
import { LoadingAction } from '../actions/loading-actions';
import { RegistrationAction } from '../actions/registration-action';
import { combineReducers } from 'redux';

const firstUserExists = (state: boolean | null = null, action: RootAction) => {
  switch (action.type) {
    case getType(LoadingAction.success):
      return action.payload;
    case getType(LoadingAction.failure):
      return false;
    case getType(RegistrationAction.success):
      return true;
    default:
      return state;
  }
};
const checkingExistenceOfFirstUser = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(LoadingAction.request):
      return true;
    case getType(LoadingAction.success):
    case getType(LoadingAction.failure):
      return false;
    default:
      return state;
  }
};

const checkRegistrationReducer = combineReducers({
  firstUserExists,
  checkingExistenceOfFirstUser,
});

export default checkRegistrationReducer;
