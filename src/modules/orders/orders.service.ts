import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CartProduct, Product } from '../../common/types';
import { User } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  // * Main order creation method
  async handleOrderCreation({ products }: CreateOrderDto, user: User) {
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
    productsFromCart: CartProduct[],
  ) {
    return storedProducts.reduce((acc: number, { productId, price }) => {
      return (acc +=
        price * productsFromCart.find(({ id }) => id === productId).quantity);
    }, 0);
  }

  // * Order creation process
  async saveOrder(cart: CartProduct[], total: number, user: User) {
    await this.prismaService.$transaction([
      this.prismaService.order.create({
        data: {
          products: { cart },
          total,
          userId: user.userId,
        },
      }),
    ]);
  }

  // * Other methods to get or handke data
  //* distinct of order creation process
  async findOrdersByUser({ userId }: User) {
    const orders = await this.prismaService.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        purchaseDate: 'desc',
      },
      take: 10,
    });

    if (!orders.length)
      throw new NotFoundException('Aún no has realizado un pedido');

    return { orders };
  }

  // * Order by specific id
  async findOrderById(orderId: string) {
    const order = await this.prismaService.order.findUnique({
      where: {
        orderId,
      },
    });

    if (!order)
      throw new NotFoundException(
        'Este pedido no existe o ya no extá disponible',
      );

    return { order };
  }
}
