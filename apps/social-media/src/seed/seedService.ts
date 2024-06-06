import { Injectable } from "@nestjs/common";

const TOTAL_CUSTOMER = 90_000;
const TOTAL_SELLER = 70_000;
const TOTAL_ORDER = 20_000;
const TOTAL_CART = 4000;
const TOTAL_PRODUCT = 14_00_000;

@Injectable()
export class SeedServiceService {
  constructor() // private readonly productSeedService: ProductSeedService,
  // private readonly orderSeedService: OrderSeedService,
  // private readonly customerSeedService: CustomerSeedService,
  // private readonly sellerSeedService: SellerSeedService,
  // private readonly cartSeedService: CartSeedService
  {}

  private async reset() {
    try {
      // // clean database before new seeding
      // await this.cartSeedService.clear();
      // await this.productSeedService.clear();
      // await this.sellerSeedService.clear();
      // await this.orderSeedService.clear();
      // await this.customerSeedService.clear();
    } catch (error) {
      console.error({ error });
    }
  }

  async seed() {
    try {
    } catch (error) {}
  }
}
