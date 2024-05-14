import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../database-provider/database-provider.module';

@Module({
  imports: [DatabaseProviderModule],
  providers: [],
})
export class SeedModule {}
