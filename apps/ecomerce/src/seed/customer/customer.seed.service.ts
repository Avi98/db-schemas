import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerSeedService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
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

          return this.customerRepository.create(user);
        }),
    );
  }

  async insertData(customers: Customer[]): Promise<Customer[]> {
    for (const customer of customers) {
      await this.customerRepository
        .createQueryBuilder('customer')
        .insert()
        .values([
          {
            orders: customer.orders,
            cart: customer.cart,
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
          },
        ])
        .execute();
    }
    const entities = await this.customerRepository
      .createQueryBuilder()
      .select()
      .getRawAndEntities();

    return entities.entities;
  }

  clear() {
    return this.customerRepository.query(
      `TRUNCATE public.customer RESTART IDENTITY CASCADE`,
    );
  }

  randomUsers(users: Customer[]) {
    return faker.helpers.arrayElement(users);
  }
}
