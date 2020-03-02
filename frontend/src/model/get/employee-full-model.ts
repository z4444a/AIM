import { Role } from '../../commons/role';

export interface EmployeeFullModel {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  post: string;
  role: Role;
}
