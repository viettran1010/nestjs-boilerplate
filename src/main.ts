import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';
import { join } from 'path';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

// i18n configuration
const i18nOptions = {
  fallbackLanguage: 'en',
  parser: I18nJsonParser,
  parserOptions: {
    path: path.join(__dirname, '/i18n/'),
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
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

  // Initialize i18n module
  await app.registerModule(I18nModule.forRoot(i18nOptions));

  await app.init();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();