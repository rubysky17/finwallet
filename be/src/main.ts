import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// ! Modules
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';

// ! Configs and Services
import { winstonConfig } from './common/logging/winston.config';
import { AppLoggerService } from './common/logging/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
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
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable Logging
  const logger = app.get(AppLoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
