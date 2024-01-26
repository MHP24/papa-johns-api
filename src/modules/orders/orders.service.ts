import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Product } from '../../common/types';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ products }: CreateOrderDto) {
    const formattedProducts = products.reduce((acc, product) => {
      return { ...acc, [product.id]: product.quantity };
    }, {});

    const dbProducts: Product[] = await this.prismaService.product.findMany({
      where: {
        productId: {
          in: Object.keys(formattedProducts),
        },
      },
    });

    if (!dbProducts.length || products.length > dbProducts.length) {
      throw new BadRequestException(
        'Algunos productos para tu compra no están disponibles',
      );
    }

    const total = dbProducts.reduce((acc: number, { productId, price }) => {
      return (acc += price * formattedProducts[productId]);
    }, 0);

    // TODO: Save order
    return { dbProducts, total };
  }

  // TODO: 3 functions to separate logic for order creation

  // * REST..
  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
