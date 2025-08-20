<<<<<<< Updated upstream
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, ip } = req;
        const userAgent = req.get('User-Agent') || '';
=======
import { Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";

export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger("HTTP");

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, ip } = req;
        const userAgent = req.get("User-Agent") || "";
>>>>>>> Stashed changes
        const startTime = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
<<<<<<< Updated upstream
            const contentLength = res.get('Content-Length');
            const responseTime = Date.now() - startTime;

            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${responseTime}ms`,
            );
        });

        next();
    }
} 
=======
            const contentLength = res.get("Content-Length");
            const responseTime = Date.now() - startTime;

            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${responseTime}ms`
            )
        })

        next();
    }
}
>>>>>>> Stashed changes
