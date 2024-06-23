import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { join } from 'path';

// i18n configuration
const i18n = I18nModule.forRoot({
  parser: I18nJsonParser,
  parserOptions: {
    path: path.join(__dirname, '/i18n/'),
    watch: true,
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalGuards(new JwtAuthGuard());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(cookieParser());
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.use(i18n);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();