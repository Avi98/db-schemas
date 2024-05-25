import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class OrderSeedService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  getData(count: number) {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    return Promise.all(
      Array(count)
        .fill('')
        .map(() => {
          const order = {
            created_date: faker.date.between({ from: firstDay, to: lastDay }),
            updated_date: new Date(),
            cart: null,
            user: null,
          };

          return this.orderRepository.create(order);
        }),
    );
  }

  async orderBelongsToCustomer(order: Order, userId: string) {
    const userOrder = await this.orderRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (userOrder) {
      return true;
    }
    return false;
  }

  clear() {
    return this.orderRepository.query(
      `TRUNCATE public.order RESTART IDENTITY CASCADE`,
    );
  }

  getOrderByCartId(cartId: string) {
    return this.orderRepository.findOne({
      where: {
        cart: {
          id: cartId,
        },
      },
    });
  }

  saveOrders(orders: Order) {
    return this.orderRepository.insert(orders);
  }
}
