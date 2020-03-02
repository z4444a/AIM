import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import { fetchAllEmployees } from '../actions/employee_action';
import NamedModel from '../../model/base/named-model';
import { selectOwners } from '../actions/resource-pool-create-page-actions';

const employeeReducer = (state: NamedModel[] = [], action: RootAction): NamedModel[] => {
  switch (action.type) {
    case getType(fetchAllEmployees.request):
      return state;
    case getType(fetchAllEmployees.success):
      return action.payload;
    case getType(selectOwners):
      return action.payload.available;
    case getType(fetchAllEmployees.failure):
    default:
      return state;
  }
};

export default employeeReducer;
