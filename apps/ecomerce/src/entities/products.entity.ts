import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Seller } from './seller.entity';
import { Cart } from './carts.entity';

@Entity()
export class Products {
  @ManyToOne(() => Seller, (seller) => seller.products)
  seller: Seller;

  @JoinTable()
  @ManyToMany(() => Cart, (carts) => carts.products)
  carts: Cart[];

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  product_name: string;

  @Column()
  type: string;

  @Column()
  category: string;
}
