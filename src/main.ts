import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtMiddleware } from './middlewares/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply global middleware for JWT token checking
  app.use(jwtMiddleware);

  await app.listen(process.env.PORT || 3000);
}

// Middleware to check for JWT tokens in request headers
function jwtMiddleware(req, res, next) {
  // Extract and verify JWT token logic here
  next();
}

bootstrap();
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();