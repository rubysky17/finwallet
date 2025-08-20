<<<<<<< Updated upstream
import { Controller, Get } from '@nestjs/common';

@Controller('health')
=======
import { Controller, Get } from "@nestjs/common";

@Controller("health")
>>>>>>> Stashed changes
export class HealthController {
    @Get()
    check() {
        return {
<<<<<<< Updated upstream
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
        };
    }
} 
=======
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || "development"
        }
    }
}
>>>>>>> Stashed changes
