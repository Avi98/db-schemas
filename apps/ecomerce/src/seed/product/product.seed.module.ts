import { Module } from '@nestjs/common';
import { ProductSeedService } from './product.seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../../entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductSeedService],
  exports: [ProductSeedService],
})
export class ProductSeedModule {}
