import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { AdaptersModule } from '../adapters/adapters.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AdaptersModule,

    // * JWT Setup
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
