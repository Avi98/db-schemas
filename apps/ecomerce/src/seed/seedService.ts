import { Injectable } from '@nestjs/common';
import { ProductSeedService } from './product/product.seed.service';
import { OrderSeedService } from './order/order.seed.service';
import { CustomerSeedService } from './customer/customer.seed.service';
import { SellerSeedService } from './seller/seller.seed.service';
import { CartSeedService } from './cart/cart.seed.service';

const TOTAL_CUSTOMER = 10;
const TOTAL_SELLER = 7;
const TOTAL_ORDER = 8;
const TOTAL_CART = 9;
const TOTAL_PRODUCT = 20;

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

      const savedCarts = await this.cartSeedService.insertData(carts);

      products.forEach((product) => {
        product.carts = this.cartSeedService.getRandomCarts(savedCarts);
        product.seller = this.sellerSeedService.getRandomSeller(seller);
        product.category = product.category;
        product.product_name = product.product_name;
        product.type = product.type;
      });

      // for (const cart of carts) {
      //   cart.order = await this.orderSeedService.getOrderByCartId(cart.id);
      //   // cart.products = await this.productSeedService.
      // }

      await this.productSeedService.insertData(products);

      await this.sellerSeedService.insertData(seller);
    } catch (error) {
      console.error({ error });
    }
  }
}
