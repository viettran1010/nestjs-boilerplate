import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller'; // Import AppController
import { APP_PIPE } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'; // Import ConfigService correctly
import { I18nModule, I18nJsonParser } from '@nestjs-modules/i18n';
import path from 'path';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptor';
import { JanitorModule } from './janitor/janitor.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en', // Define the fallback language
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return require('../ormconfig.js');
      },
    }),
    JanitorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // Strip properties that do not have any decorators
        forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
        transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')], // Use ConfigService to get COOKIE_KEY
        }),
      )
      .forRoutes('*'); // for all routes
  }
}