import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { I18nModule, I18nService } from '@nestjs-modules/i18n';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Set up i18n
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.enableCors();
  
  // Initialize i18n
  const i18nService = app.get(I18nService);
  await i18nService.init();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();