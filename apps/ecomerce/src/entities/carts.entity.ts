import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Products } from './products.entity';
import { Order } from './order.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Customer, (user) => user.cart)
  user: Customer;

  @ManyToMany(() => Products, (products) => products.carts)
  products: Products[];

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
