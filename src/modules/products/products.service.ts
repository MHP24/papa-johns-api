import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  // * Will return products between range (limit ,offset)
  async findAll(limit?: number, offset?: number, search?: string) {
    const queryLimits = this.validateLimitAndOffset(limit, offset);

    const products = await this.prismaService.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      // * Basic search filter
      where: {
        name: {
          contains: search ?? '',
        },
      },
      ...queryLimits,
    });
    if (!products.length) this.notFound();
    return products;
  }

  // * Will return 1 product (slug unique by bd constraint)
  async findBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: { slug },
    });
    if (!product) this.notFound();
    return product;
  }

  // * Can return more than 1 (supports limit, offset handling)
  async findByCategory(category: string, limit?: number, offset?: number) {
    const queryLimits = this.validateLimitAndOffset(limit, offset);

    const products = await this.prismaService.product.findMany({
      where: {
        category: {
          name: category,
        },
      },
      ...queryLimits,
    });
    if (!products.length) this.notFound();
    return products;
  }

  // * Prevent "DRY" methods...
  notFound() {
    throw new NotFoundException('Sin resultados');
  }

  validateLimitAndOffset(limit?: number, offset?: number) {
    return { skip: offset ?? 1, take: limit ?? 5 };
  }
}
