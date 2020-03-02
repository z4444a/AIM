import { createAsyncAction } from 'typesafe-actions';
import { EmployeeAsync } from './action-types';
import { EmployeeFullModel } from '../../model/get/employee-full-model';
import { ChangeRoleParams } from '../../modules/employees/features/employee-change-role-page/employee-change-role-page';
import { EmployeeParams } from '../../model/parameters/employee-params';

export const fetchFullEmployees = createAsyncAction(
  EmployeeAsync.FULL_EMPLOYEES_REQUEST,
  EmployeeAsync.FULL_EMPLOYEES_SUCCESS,
  EmployeeAsync.FULL_EMPLOYEES_FAILURE
)<EmployeeParams | undefined, EmployeeFullModel[], Error>();

export const fetchEmployee = createAsyncAction(
  EmployeeAsync.GET_EMPLOYEE_REQUEST,
  EmployeeAsync.GET_EMPLOYEE_SUCCESS,
  EmployeeAsync.GET_EMPLOYEE_FAILURE
)<number, EmployeeFullModel, Error>();

export const changeRole = createAsyncAction(
  EmployeeAsync.CHANGE_ROLE_REQUEST,
  EmployeeAsync.CHANGE_ROLE_SUCCESS,
  EmployeeAsync.CHANGE_ROLE_FAILURE
)<ChangeRoleParams, EmployeeFullModel, Error>();
