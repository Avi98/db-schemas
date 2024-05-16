import { Module } from '@nestjs/common';
import { CartSeedService } from './cart.seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../../entities/carts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartSeedService],
  exports: [CartSeedService],
})
export class CartSeedModule {}
