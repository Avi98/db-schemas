import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { User } from './user';
import { Cart } from './carts.entity';
import { Order } from './order.entity';

@Entity()
export class Customer extends User {
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @ManyToOne(() => Order, (order) => order.user)
  orders: Order[];
}
