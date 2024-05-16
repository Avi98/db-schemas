import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Cart } from './carts.entity';
import { Order } from './order.entity';

@Entity()
export class Customer extends User {
  // @PrimaryColumn({ default: () => 'gen_random_uuid()' })
  @PrimaryGeneratedColumn()
  id!: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @ManyToOne(() => Order, (order) => order.user)
  orders: Order;
}
