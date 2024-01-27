import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Hasher } from '../adapters';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly hasher: Hasher,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email, isActive: true },
      });

      // * User credentials validation
      const isValidPassword = this.hasher.compare(
        password,
        user?.password ?? '',
      );
      if (!user || !isValidPassword)
        throw new UnauthorizedException('Correo o contraseña inválida');

      // * JWT using based on user data
      return this.generateJwt(user);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error al iniciar sesión, compruebe credenciales',
      );
    }
  }

  async signUp(data: SignUpDto) {
    try {
      // * Password hashing
      const { password, ...rest } = data;
      const passwordHashed = this.hasher.hash(password);

      // * DB creation attempt
      const user = await this.prismaService.user.create({
        data: {
          ...rest,
          password: passwordHashed,
        },
      });

      // * JWT using based on user data
      return this.generateJwt(user);
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

  async findAndValidateUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { userId, isActive: true },
    });

    if (!user) throw new UnauthorizedException();
    return user;
  }

  generateJwt(user: User) {
    const { userId, username, email, roles } = user;
    return {
      payload: {
        userId,
        username,
        email,
        roles,
      },
      token: this.jwtService.sign({ userId }),
    };
  }
}
