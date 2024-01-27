import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/common/constants';
import { ValidRoles } from '../interfaces';
import { User } from '@prisma/client';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user }: { user: User } = context.switchToHttp().getRequest();
    const roles: ValidRoles[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    return !roles.length
      ? true
      : roles.some((role) => user.roles.includes(role));
  }
}
