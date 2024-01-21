import { Module } from '@nestjs/common';
// * Config
import { ConfigModule } from '@nestjs/config';
import { appConfiguration, validatorSchema } from './common/config';
// * Modules...
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      validationSchema: validatorSchema,
    }),
    OrdersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
