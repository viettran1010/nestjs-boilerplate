import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import * as path from 'path';
import { I18nModule, I18nJsonParser } from '@nestjs-modules/i18n';
import { AppService } from './app.service';
import { ScheduledDepositsModule } from './scheduled_deposits/scheduled_deposits.module';
import { AccountTypeInformationsModule } from './account_type_informations/account_type_informations.module';
import { SuccessMessagesModule } from './success_messages/success_messages.module';
import { ErrorMessagesModule } from './error_messages/error_messages.module';
import { ContractsModule } from './contracts/contracts.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { MenuOptionsModule } from './menu_options/menu_options.module';
import { UserPermissionsModule } from './user_permissions/user_permissions.module';
import { AddressUpdatesModule } from './address_updates/address_updates.module';
import { CustomersModule } from './customers/customers.module';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    ScheduledDepositsModule,
    AccountTypeInformationsModule,
    SuccessMessagesModule,
    ErrorMessagesModule,
    ContractsModule,
    AuditLogsModule,
    MenuOptionsModule,
    UserPermissionsModule,
    AddressUpdatesModule,
    CustomersModule,
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return require('../ormconfig.js');
      },
    }),
    JanitorModule
    /* TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Report],
        synchronize: true,
      }),
    }),
    */
  ],
  controllers: [AppController],
  providers: [
    AppService,
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