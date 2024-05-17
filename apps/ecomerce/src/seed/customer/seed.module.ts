import { Module } from '@nestjs/common';
import { CustomerSeedService } from './customer.seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerSeedService],
  exports: [CustomerSeedService],
})
export class CustomerSeedModule {}
