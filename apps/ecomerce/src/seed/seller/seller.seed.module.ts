import { Module } from '@nestjs/common';
import { SellerSeedService } from './seller.seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../../entities/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  providers: [SellerSeedService],
  exports: [SellerSeedService],
})
export class SellerSeedModule {}
