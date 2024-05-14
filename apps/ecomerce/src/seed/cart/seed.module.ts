import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../../database-provider/database-provider.module';
import { CartSeedService } from './cart.seed.service';

@Module({
  imports: [DatabaseProviderModule],
  providers: [CartSeedService],
})
export class SeedModule {}
