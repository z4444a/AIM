import { EmployeeFullModel } from '../get/employee-full-model';
import { PageAndSortParams } from './page-and-sort-params';

export interface EmployeeParams extends PageAndSortParams<EmployeeFullModel> {
  name?: string;
}
