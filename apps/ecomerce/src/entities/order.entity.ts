import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Cart } from './carts.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Customer, (user) => user.orders)
  user: Customer;

  @OneToOne(() => Cart, (cart) => cart.order)
  cart: Cart;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
