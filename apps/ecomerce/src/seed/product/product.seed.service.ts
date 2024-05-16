import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Products } from '../../entities/products.entity';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  clear() {
    return this.productRepository.delete({});
  }

  getData(count: number) {
    return Promise.all(
      Array(count)
        .fill('')
        .map(() => {
          const product = {
            category: faker.commerce.productAdjective(),
            type: faker.commerce.department(),
            product_name: faker.commerce.productName(),
            seller: null,
            carts: null,
          };

          return this.productRepository.create(product);
        }),
    );
  }

  async insertData(products: Products[]) {
    for (const product of products) {
      await this.productRepository
        .createQueryBuilder('product')
        .insert()
        .values({
          carts: product.carts,
          category: product.category,
          product_name: product.product_name,
          seller: product.seller,
          type: product.type,
        })
        .execute();
    }
  }
}
