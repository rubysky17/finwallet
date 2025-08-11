// src/common/common.module.ts
import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logging/winston.config';
import { AppLoggerService } from './logging/logger.service';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot(winstonConfig),
    ],
    providers: [AppLoggerService],
    exports: [AppLoggerService],
})
export class CommonModule { }
