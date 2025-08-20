import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
// ! Modules
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';

// ! Configs and Services
import { winstonConfig } from './common/logging/winston.config';
import { AppLoggerService } from './common/logging/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Remove properties that don't have decorators
        forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
        transform: true, // Transform payloads to be objects typed according to their DTO classes
        transformOptions: {
          enableImplicitConversion: true, // Enable implicit conversion
        },
        errorHttpStatusCode: 422, // Use 422 for validation errors
      }),
    );

    // Enable CORS
    app.enableCors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
    });

    // Enable Logging
    const appLogger = app.get(AppLoggerService);
    app.useGlobalFilters(new AllExceptionsFilter(appLogger));

    const port = process.env.APP_PORT || 3000;
    await app.listen(port);

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.log('SIGTERM received, shutting down gracefully');
      await app.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.log('SIGINT received, shutting down gracefully');
      await app.close();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
