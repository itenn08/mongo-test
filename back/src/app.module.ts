import { PageCategoryController } from "./controllers/pageCategory";
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
import { PageCategoryService } from "./services/pageCategory.service";
import { PageCategorySchema } from "./schemas/pageCategory.schema";

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
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [UserController, PageController, PageCategoryController],
  providers: [
    UserService,
    PageService,
    PageCategoryService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UserService, PageService, PageCategoryService],
})
export class AppModule {}
