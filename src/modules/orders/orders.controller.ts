import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Auth, User } from 'src/common/auth/decorators';
import type { User as UserT } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @Auth()
  create(@Body() createOrderDto: CreateOrderDto, @User() user: UserT) {
    return this.ordersService.createOrder(createOrderDto, user);
  }
}
