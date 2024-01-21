import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { AdaptersModule } from '../adapters/adapters.module';

@Module({
  imports: [PrismaModule, AdaptersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
