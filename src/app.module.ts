import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { I18nModule, I18nJsonParser } from '@nestjs-modules/i18n';
import path from 'path';
import { Contract } from './contracts/contract.entity';
import { AuditLog } from './audit_logs/audit_log.entity';
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
    I18nModule.forRoot({
      fallbackLanguage: i18nOptions.fallbackLanguage,
      parser: I18nJsonParser,
      parserOptions: i18nOptions.parserOptions,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...require('../ormconfig.js'),
          entities: [User, Report, Contract, AuditLog],
        };
      },
    }),
    JanitorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        validationError: { target: false },
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