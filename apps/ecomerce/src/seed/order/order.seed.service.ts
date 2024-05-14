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
          const order: Order = {
            id: faker.string.uuid(),
            created_date: faker.date.between({ from: firstDay, to: lastDay }),
            updated_date: new Date(),
            cart: null,
            user: null,
          };

          return this.orderRepository.create(order);
        }),
    );
  }
}
