import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from '@nestjs-modules/i18n';
import { AddressUpdateService } from './address_updates/address_update.service';
// import { AllExceptionsFilter } from './filters/all-exceptions.filter'; // File not found, comment out or ensure file exists
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptor';
import { JanitorModule } from './janitor/janitor.module';
import * as path from 'path';
const cookieSession = require('cookie-session');

@Module({
  imports: [
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
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser, // Ensure I18nJsonParser is imported correctly
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: AddressUpdateService,
      useClass: AddressUpdateService,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter, // Comment out or ensure AllExceptionsFilter is defined
    // },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
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
          keys: [this.configService.get('COOKIE_KEY')], // for encryption
        }),
      )
      .forRoutes('*'); // for all routes
  }
}