import { ApiParam } from '@nestjs/swagger';

const findByOrderId = [
  ApiParam({
    name: 'orderId',
    type: String,
    description: 'Unique order id to find information about the purchase',
  }),
];

export const ordersDocumentation = {
  findByOrderId,
};
