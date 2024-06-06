import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    private readonly dataSource: DataSource
    // @InjectRepository(Customer)
    // private readonly customerRepo: Repository<Customer>,
    // @InjectRepository(Products)
    // private readonly productsRepo: Repository<Products>,
    // @InjectRepository(Order)
    // private readonly orderRepo: Repository<Order>,
  ) {}
}
