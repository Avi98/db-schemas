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
    return Array(count)
      .fill('')
      .map(() => {
        const cart = {
          isActive: faker.datatype.boolean(),
        };

        return this.cartRepository.create(cart);
      });
  }

  async insertData(carts: Partial<Cart>[]): Promise<Cart[]> {
    for (const cart of carts) {
      await this.cartRepository
        .createQueryBuilder()
        .insert()
        .values({ isActive: cart.isActive })
        .execute();
    }
    return await this.cartRepository.createQueryBuilder().select().execute();
  }

  clear() {
    return this.cartRepository.delete({});
  }

  getRandomCart(carts: Cart[]) {
    return faker.helpers.arrayElement(carts);
  }

  getRandomCarts(carts: Cart[]) {
    return faker.helpers.arrayElements(carts);
  }
}
