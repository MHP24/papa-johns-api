import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Hasher } from '../adapters';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly hasher: Hasher,
  ) {}

  signIn(data: SignInDto) {
    return data;
  }

  async signUp(data: SignUpDto) {
    try {
      // * Password hashing
      const { password, ...rest } = data;
      const passwordHashed = this.hasher.hash(password);

      // * DB creation attempt
      await this.prismaService.user.create({
        data: {
          ...rest,
          password: passwordHashed,
        },
      });

      // * JWT using basic user data
      // TODO: Generate JWT
      return data;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Usuario con email: ${data.email} ya se encuentra registrado`,
        );
      }
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
