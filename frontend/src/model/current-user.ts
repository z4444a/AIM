import { Role } from '../commons/role';

export interface CurrentUser {
  id: number;
  fullName: string;
  username: string;
  role: Role;
}
