import { Injectable } from '@nestjs/common';
import { ProductSeedService } from './product/product.seed.service';
import { OrderSeedService } from './order/order.seed.service';
import { CustomerSeedService } from './customer/customer.seed.service';
import { SellerSeedService } from './seller/seller.seed.service';
import { CartSeedService } from './cart/cart.seed.service';

const TOTAL_CUSTOMER = 90_000;
const TOTAL_SELLER = 70_000;
const TOTAL_ORDER = 20_000;
const TOTAL_CART = 40_000;
const TOTAL_PRODUCT = 20_000;

@Injectable()
export class SeedServiceService {
  constructor(
    private readonly productSeedService: ProductSeedService,
    private readonly orderSeedService: OrderSeedService,
    private readonly customerSeedService: CustomerSeedService,
    private readonly sellerSeedService: SellerSeedService,
    private readonly cartSeedService: CartSeedService,
  ) {}

  private async reset() {
    try {
      // clean database before new seeding
      await this.cartSeedService.clear();
      await this.productSeedService.clear();
      await this.sellerSeedService.clear();
      await this.orderSeedService.clear();
      await this.customerSeedService.clear();
    } catch (error) {
      console.error({ error });
    }
  }

  async seed() {
    try {
      await this.reset();

      const customers = await this.customerSeedService.getData(TOTAL_CUSTOMER);
      const seller = await this.sellerSeedService.getData(TOTAL_SELLER);

      const orders = await this.orderSeedService.getData(TOTAL_ORDER);
      const carts = await this.cartSeedService.getData(TOTAL_CART);
      const products = await this.productSeedService.getData(TOTAL_PRODUCT);

      orders.forEach((order) => {
        const customer = this.customerSeedService.randomUsers(customers);
        if (!order.user) {
          order.user = customer;
          if (!customer.orders) {
            customer.orders = order;
          }
        }
        if (!order.cart) {
          const cart = this.cartSeedService.getRandomCart(carts);
          order.cart = cart;
          customer.cart = cart;
        }
      });

      await this.orderSeedService.saveOrders(orders);
      const savedCustomers =
        await this.customerSeedService.insertData(customers);

      carts.forEach((cart) => {
        cart.user = this.customerSeedService.randomUsers(savedCustomers);
      });

      products.forEach((product) => {
        const randomSeller = this.sellerSeedService.getRandomSeller(seller);
        if (randomSeller.products) {
          randomSeller.products.push(product);
        } else {
          randomSeller.products = [product];
        }

        product.seller = randomSeller;
        product.category = product.category;
        product.product_name = product.product_name;
        product.type = product.type;
      });

      await this.cartSeedService.insertData(carts);

      await this.sellerSeedService.insertData(seller);
      const allSavedProducts =
        await this.productSeedService.insertData(products);

      await this.cartSeedService.updateCartProducts(allSavedProducts);
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
}
