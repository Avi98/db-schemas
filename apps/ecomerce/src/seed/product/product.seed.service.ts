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

  getData(count: number) {
    return Promise.all(
      Array(count)
        .fill('')
        .map(() => {
          const product: Products = {
            id: faker.string.uuid(),
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
}
