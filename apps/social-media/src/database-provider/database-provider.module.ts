import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres-social-media",
      type: "postgres",
      // entities: [Seller, Customer, Products, Cart, Order],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
    }),
  ],
})
export class DatabaseProviderModule {}
