import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../../database-provider/database-provider.module';
import { OrderSeedService } from './order.seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderSeedService],
  exports: [OrderSeedService],
})
export class OrderSeedModule {}
