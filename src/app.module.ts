import { Module } from '@nestjs/common';
// * Config
import { ConfigModule } from '@nestjs/config';
import { appConfiguration, validatorSchema } from './common/config';
// * Modules...
import { PrismaModule } from './providers/prisma/prisma.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      validationSchema: validatorSchema,
    }),
    PrismaModule,
    OrdersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
