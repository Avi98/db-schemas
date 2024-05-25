import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Cart } from './carts.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Customer, (user) => user.orders, { cascade: true })
  user: Customer;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
