import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuditLog } from './audit_logs/audit_log.entity';
import { I18nModule, I18nJsonParser } from '@nestjs-modules/i18n';
import { i18nextHttpMiddleware } from 'i18next-http-middleware';
import { AppService } from './app.service';
import { ContractsModule } from './contracts/contracts.module';
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
      isGlobal: true, // Indicates that the ConfigModule is a global module
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: { // Options for the i18n JSON parser
        path: path.join(__dirname, '/i18n/'),
      },
    }),
    ContractsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return require('../ormconfig.js');
      }, // Loads the ORM configuration from the ormconfig.js file
    }),
    JanitorModule,
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: configService.get('DB_PORT'), // Retrieves the database port from the configuration
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [User, Report],
    //     synchronize: true,
    //   }),
    // }),
    // TypeOrmModule.forRootAsync({ // Alternative TypeOrmModule configuration for SQLite
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'sqlite',
    //     database: configService.get('DB_NAME'),
    //     entities: [User, Report],
    //     synchronize: true,
    //   }),
    // }), // End of the commented out TypeOrmModule configuration
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }, // Sets up the ValidationPipe as a global pipe for validation
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {} // Injects the ConfigService for use in the module

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')], // for encryption
        }),
        i18nextHttpMiddleware({ // Middleware for i18next to handle internationalization
          i18n: i18next,
          order: ['querystring', 'cookie', 'header'],
        }),
      )
      .forRoutes('*'); // for all routes
  }
}