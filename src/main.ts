import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
+import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
+import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
+  app.useStaticAssets(path.join(__dirname, '..', 'public'));
+  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
+  app.setViewEngine('hbs');
+  app.useGlobalPipes(new ValidationPipe());
+  app.useGlobalFilters(new AllExceptionsFilter());
+  app.useGlobalInterceptors(new TransformInterceptor());
+  app.useGlobalGuards(new JwtAuthGuard());
+  await app.init();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();