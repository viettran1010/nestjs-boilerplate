import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from '@nestjs-modules/i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptor';
import { JanitorModule } from './janitor/janitor.module';
import { ContractsModule } from './contracts/contracts.module';
const cookieSession = require('cookie-session');

const i18nOptions = {
  fallbackLanguage: 'en',
  parserOptions: {
    path: path.join(__dirname, '/i18n/'),
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    ContractsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return require('../ormconfig.js');
      },
    }),
    JanitorModule,
    I18nModule.forRoot({
      fallbackLanguage: i18nOptions.fallbackLanguage,
      parser: I18nJsonParser,
      parserOptions: i18nOptions.parserOptions,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [User, Report],
    //     synchronize: true,
    //   }),
    // }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'sqlite',
    //     database: configService.get('DB_NAME'),
    //     entities: [User, Report],
    //     synchronize: true,
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
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