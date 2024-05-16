import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../database-provider/database-provider.module';
import { SeedServiceService } from './seedService';
import { SellerSeedModule } from './seller/seller.seed.module';
import { CustomerSeedModule } from './customer/seed.module';
import { CartSeedModule } from './cart/seed.module';
import { ProductSeedModule } from './product/product.seed.module';
import { OrderSeedModule } from './order/order.seed.module';

@Module({
  imports: [
    DatabaseProviderModule,
    SellerSeedModule,
    CustomerSeedModule,
    CartSeedModule,
    ProductSeedModule,
    OrderSeedModule,
  ],
  providers: [SeedServiceService],
})
export class SeedModule {}
