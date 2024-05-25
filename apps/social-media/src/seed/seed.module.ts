import { Module } from "@nestjs/common";
import { SeedServiceService } from "./seedService";

@Module({
  imports: [
    // DatabaseProviderModule,
    // SellerSeedModule,
    // CustomerSeedModule,
    // CartSeedModule,
    // ProductSeedModule,
    // OrderSeedModule,
  ],
  providers: [SeedServiceService],
})
export class SeedModule {}
