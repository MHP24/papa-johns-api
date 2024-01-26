import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Product } from '../../common/types';
import { ProductDto } from '../products/dto';
import { User } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  // * Main order creation method
  async createOrder({ products }: CreateOrderDto, user: User) {
    const dbProducts = await this.findProducts(products.map(({ id }) => id));

    if (!dbProducts.length || products.length > dbProducts.length) {
      throw new BadRequestException(
        'Algunos productos para tu compra no están disponibles',
      );
    }
    const total = this.calculateProductsInCart(dbProducts, products);

    // ! Order creation and store in db
    try {
      await this.saveOrder(products, total, user);
      return { total };
    } catch (error) {
      throw new InternalServerErrorException(
        'Hay inconvenientes para procesar el pago. Intente nuevamente',
      );
    }
  }

  // * Product finder to check if ids are the same and are available in db
  async findProducts(products: string[]): Promise<Product[]> {
    return await this.prismaService.product.findMany({
      where: {
        productId: {
          in: products,
        },
      },
    });
  }

  // * Calc cart handling quantity and price from database
  calculateProductsInCart(
    storedProducts: Product[],
    productsFromCart: ProductDto[],
  ) {
    return storedProducts.reduce((acc: number, { productId, price }) => {
      return (acc +=
        price * productsFromCart.find(({ id }) => id === productId).quantity);
    }, 0);
  }

  // * Order creation process
  async saveOrder(cart: ProductDto[], total: number, user: User) {
    await this.prismaService.$transaction([
      this.prismaService.order.create({
        data: {
          products: JSON.stringify({ cart }),
          total,
          userId: user.userId,
        },
      }),
    ]);
  }

  // * Other methods to get or handke data
  //* distinct of order creation process
}
