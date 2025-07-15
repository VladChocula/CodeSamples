import { INestMicroservice, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestMicroservice): Promise<void>;
}
//# sourceMappingURL=prisma.service.d.ts.map