import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../../database-provider/database-provider.module';
import { ProductSeedService } from './product.seed.service';

@Module({
  imports: [DatabaseProviderModule],
  providers: [ProductSeedService],
})
export class SeedModule {}
