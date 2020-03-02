import { getType, RootAction } from 'typesafe-actions';
import { fetchFullEmployees } from '../actions/full-employee-action';
import PageModel from '../../model/base/page-model';
import { EmployeeFullModel } from '../../model/get/employee-full-model';
import { EmployeeParams } from '../../model/parameters/employee-params';

interface EmployeesProps {
  page: PageModel<EmployeeFullModel> | null;
  params: EmployeeParams;
}

const employeesReducer = (
  state: EmployeesProps = {
    page: null,
    params: {
      pageSize: 50,
    },
  },
  action: RootAction
): EmployeesProps => {
  switch (action.type) {
    case getType(fetchFullEmployees.request):
      return Object.assign({}, state, {
        params: action.payload,
      });
    case getType(fetchFullEmployees.success):
      return Object.assign({}, state, {
        page: action.payload,
      });
    case getType(fetchFullEmployees.failure):
      return {
        params: {
          pageSize: 10,
        },
        page: null,
      };
    default:
      return state;
  }
};
export default employeesReducer;
