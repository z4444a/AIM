import { EmployeeFullModel } from '../../model/get/employee-full-model';
import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import { changeRole, fetchEmployee } from '../actions/full-employee-action';

const getEmployeeReducer = (
  state: EmployeeFullModel | null = null,
  action: RootAction
): EmployeeFullModel | null => {
  switch (action.type) {
    case getType(fetchEmployee.request):
      return state;
    case getType(fetchEmployee.success):
      return action.payload;
    case getType(fetchEmployee.failure):
      return state;
    case getType(changeRole.request):
      return state;
    case getType(changeRole.success):
      return action.payload;
    case getType(changeRole.failure):
      return state;
    default:
      return state;
  }
};
export default getEmployeeReducer;
