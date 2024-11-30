import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserPermission } from './user_permissions/user_permission.entity';
import { I18nModule, I18nJsonParser } from '@nestjs-modules/i18n';
import { join } from 'path';
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
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        entities: [User, Report, UserPermission],
        return require('../ormconfig.js');
      }),
    }),
    JanitorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, // Keep existing providers
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Use class instead of value to configure global pipe
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
        });
      },
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