import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { seedCategories, seedProducts } from '../products/mocks';

@Injectable()
export class SeedService {
  logger = new Logger(SeedService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async generateSeedProducts() {
    try {
      await this.prismaService.$transaction([
        this.prismaService.category.createMany({
          data: seedCategories,
        }),
        this.prismaService.product.createMany({
          data: seedProducts,
        }),
      ]);
      return {
        execution: 'success',
      };
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(
        'Unexpected error generating seed, check server logs for more info.',
      );
    }
  }
}
