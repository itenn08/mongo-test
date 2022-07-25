"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
        logger: ["error", "warn", "log", "debug"],
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map