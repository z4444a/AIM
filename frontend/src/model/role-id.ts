import { Role } from '../commons/role';

type RoleId = { [role in Role]: number };

export const roleById = {
  [Role.USER]: 1,
  [Role.ADMIN]: 2,
  [Role.POOL_CREATOR]: 3,
  [Role.POOL_OWNER]: 4,
};
