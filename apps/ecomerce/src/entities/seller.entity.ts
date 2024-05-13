import { Entity, OneToMany } from 'typeorm';
import { User } from './user';
import { Products } from './products.entity';

@Entity()
export class Seller extends User {
  @OneToMany(() => Products, (user) => user.seller)
  products: Products[];
}
