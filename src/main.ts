import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import * as i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { AppModule } from './app.module';

// Initialize i18next with filesystem backend and middleware
i18next.use(Backend).use(i18nextMiddleware.LanguageDetector).init({
  fallbackLng: 'en',
  backend: {
    loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(i18nextMiddleware.handle(i18next));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();