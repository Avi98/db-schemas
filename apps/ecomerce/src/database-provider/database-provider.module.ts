import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../entities/seller.entity';
import { Customer } from '../entities/customer.entity';
import { Products } from '../entities/products.entity';
import { Cart } from '../entities/carts.entity';
import { Order } from '../entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      type: 'postgres',
      entities: [Seller, Customer, Products, Cart, Order],
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
    }),
  ],
})
export class DatabaseProviderModule {}
