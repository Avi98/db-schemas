import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Cart } from '../../entities/carts.entity';
import { Products } from '../../entities/products.entity';

@Injectable()
export class CartSeedService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly dataSource: DataSource,
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
    const { entities } = await this.cartRepository
      .createQueryBuilder()
      .select()
      .getRawAndEntities();

    return entities;
  }

  clear() {
    return this.cartRepository.query(
      `TRUNCATE public.cart RESTART IDENTITY CASCADE`,
    );
  }

  getRandomCart(carts: Cart[]) {
    return faker.helpers.arrayElement(carts);
  }

  async updateCartProducts(products: Products[]) {
    const cartIds = await this.cartRepository
      .createQueryBuilder()
      .select('id')
      .execute();

    for (const { id: cartId } of cartIds) {
      const product = faker.helpers.arrayElement(products);

      await this.dataSource
        .createEntityManager()
        .createQueryBuilder()
        .insert()
        .into('product_cart_map', ['productsId', 'cartId'])
        //@ts-ignore
        .values({ productsId: product.Products_id, cartId: cartId })
        .execute();
    }
  }
  getRandomCarts(carts: Cart[]) {
    return faker.helpers.arrayElements(carts);
  }
}
