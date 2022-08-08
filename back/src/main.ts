import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
    logger: ["error", "warn", "log", "debug"],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8080);
}
bootstrap();
