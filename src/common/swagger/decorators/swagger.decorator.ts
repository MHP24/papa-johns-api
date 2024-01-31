import { applyDecorators } from '@nestjs/common';

export const Swagger = (
  decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[],
) => applyDecorators(...decorators);
