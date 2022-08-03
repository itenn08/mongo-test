import { ProductService } from "./services/products.service";
import { ProductsController } from "./controllers/products.controller";
import { PageCategoryController } from "./controllers/page-category.controller";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { UserSchema } from "./schemas/user.schema";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt-auth.strategy";
import { PageSchema } from "./schemas/page.schema";
import { PageController } from "./controllers/pages.controller";
import { PageService } from "./services/page.service";
import { PageCategoryService } from "./services/page-category.service";
import { PageCategorySchema } from "./schemas/page-category.schema";
import { ProductSchema } from "./schemas/products.schema";
import { OrderSchema } from "./schemas/order.schema";
import { OrderService } from "./services/order.service";
import { OrderController } from "./controllers/order.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c9jvb.mongodb.net/?retryWrites=true&w=majority`
    ),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Page", schema: PageSchema },
      { name: "PageCategory", schema: PageCategorySchema },
      { name: "Products", schema: ProductSchema },
      { name: "Order", schema: OrderSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [
    UserController,
    PageController,
    PageCategoryController,
    ProductsController,
    OrderController,
  ],
  providers: [
    UserService,
    PageService,
    PageCategoryService,
    ProductService,
    OrderService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    UserService,
    PageService,
    PageCategoryService,
    ProductService,
    OrderService,
  ],
})
export class AppModule {}
