import { Injectable } from '@nestjs/common';
import { HasherAdapter } from './interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Hasher implements HasherAdapter {
  hash(arg: string): string {
    return bcrypt.hashSync(arg, 10);
  }

  compare(arg1: string, arg2: string): boolean {
    return bcrypt.compareSync(arg1, arg2);
  }
}
