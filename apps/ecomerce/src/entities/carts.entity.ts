import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Products } from './products.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Customer, (user) => user.cart)
  user: Customer;

  @ManyToMany(() => Products, (products) => products.carts)
  products: Products[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
