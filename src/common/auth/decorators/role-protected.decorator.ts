import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from 'src/common/constants';
import { ValidRoles } from '../interfaces';

export const RoleProtected = (args: ValidRoles[]) =>
  SetMetadata(META_ROLES, args);
