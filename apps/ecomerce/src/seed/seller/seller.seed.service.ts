import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Seller } from '../../entities/seller.entity';

@Injectable()
export class SellerSeedService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  getData(count: number) {
    return Promise.all(
      Array(count)
        .fill('')
        .map(() => {
          const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
          };

          return this.sellerRepository.create(user);
        }),
    );
  }

  insertData(data: Seller[]) {
    return this.sellerRepository.save(data, { chunk: 1000 });
  }

  getRandomSeller(sellers: Seller[]) {
    return faker.helpers.arrayElement(sellers);
  }

  clear() {
    return this.sellerRepository.query(
      `TRUNCATE public.seller RESTART IDENTITY CASCADE;`,
    );
  }
}
