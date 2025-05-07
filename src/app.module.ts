import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller'; // No change here, just for context
import { I18nModule, I18nJsonParser, I18nService } from '@nestjs-modules/i18n';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import * as path from 'path';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptor';
import { JanitorModule } from './janitor/janitor.module';
import { HeaderResolver, AcceptLanguageResolver } from '@nestjs-modules/i18n/resolvers';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Indicates that the ConfigModule is a global module
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
    I18nModule.forRoot({ // Set up the i18n module
      fallbackLanguage: 'en', // Specify the fallback language
      parser: I18nJsonParser, // Use the JSON parser
      parserOptions: {
        path: path.join(__dirname, '/i18n/'), // Define the path to translation files
        watch: true, // Enable hot reloading of translation files
      },
      resolvers: [
        { use: HeaderResolver, options: ['x-custom-lang'] }, // Resolve language from custom header
        AcceptLanguageResolver, // Resolve language from 'Accept-Language' header
      ],
    }),
    // Other commented out TypeOrmModule configurations...
  ],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_PIPE, // Global validation pipe
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true, // Strip properties that do not have any decorators
          forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
          transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
          validationError: { target: false }, // Do not include the target value in the validation error
        });
      },
    },
    {
      provide: APP_FILTER, // Global exception filter
      useClass: AllExceptionsFilter, // Use the custom AllExceptionsFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    }
  ]
}) // Removed extra comma
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({ // No change here, just for context
          keys: [this.configService.get('COOKIE_KEY')], // for encryption
        }),
      )
      .forRoutes('*'); // for all routes
  }
}