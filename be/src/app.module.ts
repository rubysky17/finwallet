<<<<<<< Updated upstream
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { CommonModule } from './common/common.module';
import { WalletModule } from './wallets/wallet.module';
import { CategoryModule } from './categories/category.module';
import { CategoryTemplateModule } from './categoryTemplate/category-template.module';

// Middlewares
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserWalletModule } from './userWallet/userWallet.module';
=======
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// ! Middlewares
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
>>>>>>> Stashed changes

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
<<<<<<< Updated upstream
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3303),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', '123456'),
        database: configService.get('DB_DATABASE', 'todo_db'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // migrations: [__dirname + '/migrations/*{.ts,.js}'],
        // cli: {
        //   migrationsDir: 'src/migrations',
        // },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    HealthModule,
    CategoryModule,
    CategoryTemplateModule,
    CommonModule,
    WalletModule,
    UserWalletModule,
=======
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || "3303"),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'todo_db',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development', // Only in development,
    }),
    HealthModule,
    UsersModule
>>>>>>> Stashed changes
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
