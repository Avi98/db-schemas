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
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Seller, (seller) => seller.products, { cascade: true })
  seller: Seller;

  @JoinTable({ name: 'product_cart_map' })
  @ManyToMany(() => Cart, (carts) => carts.products)
  carts: Cart[];

  @Column()
  product_name: string;

  @Column()
  type: string;

  @Column()
  category: string;
}
