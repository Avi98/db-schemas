import { Entity, OneToOne } from 'typeorm';
import { User } from './user';
import { Cart } from './carts.entity';

@Entity()
export class Customer extends User {
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
