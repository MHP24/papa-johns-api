import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((_, req) => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});
