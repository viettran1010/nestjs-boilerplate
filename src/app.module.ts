import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module'; // Added StudentsModule import
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptor';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { JanitorModule } from './janitor/janitor.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser, // Configure i18n with the path to translation files
      parserOptions: {
        path: join(__dirname, '/i18n/'),
      },
    }),
    ReportsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return require('../ormconfig.js'); // Autoload entities with TypeOrmModule
      },
    }),

    StudentsModule, // Ensure StudentsModule is imported for autoloading
    JanitorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, // Enable global validation with ValidationPipe
        transform: true
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