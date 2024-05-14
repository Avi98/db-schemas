import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../../database-provider/database-provider.module';
import { OrderSeedService } from './order.seed.service';

@Module({
  imports: [DatabaseProviderModule],
  providers: [OrderSeedService],
})
export class SeedModule {}
