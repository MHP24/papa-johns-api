import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../interfaces';

export const Auth = (...args: ValidRoles[]) =>
  applyDecorators(RoleProtected(args), UseGuards(AuthGuard(), UserRoleGuard));
