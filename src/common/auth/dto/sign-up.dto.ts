import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './sign-in.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
