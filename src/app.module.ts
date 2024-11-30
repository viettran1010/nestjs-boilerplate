import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, EmailService } from './app.service'; // EmailService imported here
import { JwtModule } from '@nestjs/jwt';
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
      isGlobal: true, // Configuration is global
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' }, // Token expires in 60 minutes
      }),
      useFactory: () => { // Database configuration
        return require('../ormconfig.js');
      },
    }),
    JanitorModule,
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres', // PostgreSQL database
    //     host: configService.get('DB_HOST'),
    //     port: configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [User, Report],
    //     synchronize: true,
    //   }),
    // }), // Commented out alternative database configuration
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'sqlite',
    //     database: configService.get('DB_NAME'),
    //     entities: [User, Report],
    //     synchronize: true,
    //   }), // Commented out SQLite database configuration
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ // Global validation pipe
        whitelist: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor, // Interceptor for current user
    },
    EmailService, // Email service
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) { // Middleware configuration
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')], // for encryption
        }),
      )
      .forRoutes('*'); // for all routes
  } // End of AppModule
}