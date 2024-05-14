import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Cart } from '../../entities/carts.entity';

@Injectable()
export class CartSeedService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  getData(count: number) {
    return Promise.all(
      Array(count)
        .fill('')
        .map(() => {
          const cart: Cart = {
            id: faker.string.uuid(),
            isActive: faker.datatype.boolean(),
            order: null,
            user: null,
            products: null,
          };

          return this.cartRepository.create(cart);
        }),
    );
  }
}
