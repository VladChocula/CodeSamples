import { Cache } from 'cache-manager';
import { SiweMessage } from 'siwe';
export declare class SiweService {
    private cacheManager;
    private readonly logger;
    constructor(cacheManager: Cache);
    createNonce(address: string): Promise<string>;
    verifyMessage(message: string, signature: string): Promise<SiweMessage>;
}
//# sourceMappingURL=siwe.service.d.ts.map