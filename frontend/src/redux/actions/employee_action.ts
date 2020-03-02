import { EmployeeAsync } from './action-types';
import { createAsyncAction } from 'typesafe-actions';
import NamedModel from '../../model/base/named-model';

export const fetchAllEmployees = createAsyncAction(
  EmployeeAsync.EMPLOYEE_ALL,
  EmployeeAsync.EMPLOYEE_ALL_SUCCESS,
  EmployeeAsync.EMPLOYEE_ALL_FAILURE
)<void, NamedModel[], Error>();
