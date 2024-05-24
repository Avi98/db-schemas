import { Injectable } from '@nestjs/common';
import { ProductSeedService } from './product/product.seed.service';
import { OrderSeedService } from './order/order.seed.service';
import { CustomerSeedService } from './customer/customer.seed.service';
import { SellerSeedService } from './seller/seller.seed.service';
import { CartSeedService } from './cart/cart.seed.service';

const TOTAL_CUSTOMER = 9000;
const TOTAL_SELLER = 7000;
const TOTAL_ORDER = 2000;
const TOTAL_CART = 400;
const TOTAL_PRODUCT = 80_000;

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

      const savedCustomers =
        await this.customerSeedService.insertData(customers);

      carts.forEach((cart) => {
        cart.user = this.customerSeedService.randomUsers(savedCustomers);
      });

      const savedCart = await this.cartSeedService.insertData(carts);

      orders.forEach((order) => {
        const customer = this.customerSeedService.randomUsers(savedCustomers);
        if (!order.user) {
          order.user = customer;
        }

        const cart = this.cartSeedService.getRandomCart(savedCart);
        if (
          cart?.id &&
          !order.cart &&
          !orders.find((pre) => pre?.cart?.id === cart.id)
        ) {
          order.cart = cart;
        }
      });

      for (const order of orders) {
        if (order?.cart?.id) {
          await this.orderSeedService.saveOrders(order);
        }
      }

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
