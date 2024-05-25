import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Products } from './products.entity';

@Entity()
export class Seller extends User {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Products, (user) => user.seller)
  products: Products[];
}
