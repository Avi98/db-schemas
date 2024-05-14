import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../../database-provider/database-provider.module';
import { CustomerSeedService } from './customer.seed.service';

@Module({
  imports: [DatabaseProviderModule],
  providers: [CustomerSeedService],
})
export class SeedModule {}
