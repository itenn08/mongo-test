"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./services/user.service");
const user_controller_1 = require("./controllers/user.controller");
const user_schema_1 = require("./schemas/user.schema");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_auth_strategy_1 = require("./strategies/jwt-auth.strategy");
const page_schema_1 = require("./schemas/page.schema");
const pages_controller_1 = require("./controllers/pages.controller");
const page_service_1 = require("./services/page.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c9jvb.mongodb.net/?retryWrites=true&w=majority`),
            mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: user_schema_1.UserSchema },
                { name: "Page", schema: page_schema_1.PageSchema },
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "24h" },
            }),
        ],
        controllers: [user_controller_1.UserController, pages_controller_1.PageController],
        providers: [user_service_1.UserService, page_service_1.PageService, local_strategy_1.LocalStrategy, jwt_auth_strategy_1.JwtStrategy],
        exports: [user_service_1.UserService, page_service_1.PageService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map