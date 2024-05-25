import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly dataSource: DataSource,
    // @InjectRepository(Customer)
    // private readonly customerRepo: Repository<Customer>,
    // @InjectRepository(Products)
    // private readonly productsRepo: Repository<Products>,
    // @InjectRepository(Order)
    // private readonly orderRepo: Repository<Order>,
  ) {}

  async getPerDaySales(date: Date) {
    // await this.customerRepo.find;
  }

  async getMaximumSalePerDay() {
    return await this.dataSource
      .getRepository(Order)
      .createQueryBuilder('order')
      .select([
        `To_char("order".created_date :: DATE, 'dd-mm-yyyy') AS order_date`,
        `Count("cart_map"."productsId")                 AS total_products_sold`,
      ])
      .innerJoin('order.cart', 'cart')
      .groupBy(`TO_CHAR("order".created_date::DATE, 'dd-mm-yyyy')`)
      .leftJoin('product_cart_map', 'cart_map', 'cart.id=cart_map.cartId')
      .getRawMany();
  }
}
