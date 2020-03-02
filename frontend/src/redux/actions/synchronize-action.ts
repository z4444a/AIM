import { createAsyncAction } from 'typesafe-actions';
import { EmployeeParams } from '../../model/parameters/employee-params';

enum SynchronizeActionType {
  SYNCHRONIZE_REQUEST = 'SYNCHRONIZE_REQUEST',
  SYNCHRONIZE_SUCCESS = 'SYNCHRONIZE_SUCCESS',
  SYNCHRONIZE_FAILURE = 'SYNCHRONIZE_FAILURE',
}

export const SynchronizeAction = createAsyncAction(
  SynchronizeActionType.SYNCHRONIZE_REQUEST,
  SynchronizeActionType.SYNCHRONIZE_SUCCESS,
  SynchronizeActionType.SYNCHRONIZE_FAILURE
)<EmployeeParams | undefined, void, Error>();
