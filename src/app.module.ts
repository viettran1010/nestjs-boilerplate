import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { I18nModule } from '@nestjs-modules/i18n';
import { join } from 'path';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parserOptions: {
        path: join(__dirname, '/i18n/'),
      },
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // or 'sqlite', depending on your DB
        // ... other options
      }),
    }),
    JanitorModule,
    // ... other module configurations
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    // ... other providers
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