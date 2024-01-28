import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Auth, User } from 'src/common/auth/decorators';
import type { User as UserT } from '@prisma/client';
import { ValidRoles } from 'src/common/auth/interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @Auth(ValidRoles.user)
  create(@Body() createOrderDto: CreateOrderDto, @User() user: UserT) {
    return this.ordersService.handleOrderCreation(createOrderDto, user);
  }

  @Get()
  @Auth(ValidRoles.user)
  findAll(@User() user: UserT) {
    return this.ordersService.findOrdersByUser(user);
  }

  @Get('/:orderId')
  @Auth()
  findOne(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.findOrderById(orderId);
  }
}
