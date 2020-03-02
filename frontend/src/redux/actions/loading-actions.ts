import { createAsyncAction } from 'typesafe-actions';

enum CheckRegistrationActionType {
  CHECK_REQUEST = 'CHECK',
  CHECK_SUCCESS = 'CHECK_SUCCESS',
  CHECK_FAILURE = 'CHECK_FAILURE',
}

export const LoadingAction = createAsyncAction(
  CheckRegistrationActionType.CHECK_REQUEST,
  CheckRegistrationActionType.CHECK_SUCCESS,
  CheckRegistrationActionType.CHECK_FAILURE
)<undefined, boolean, Error>();
