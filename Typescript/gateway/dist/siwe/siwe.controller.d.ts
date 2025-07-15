import { SiweService } from './siwe.service';
import { GetNonceDTO } from './types/siwe.dto';
export declare class SiweController {
    private readonly siweService;
    private readonly logger;
    constructor(siweService: SiweService);
    getNonce({ address }: GetNonceDTO): Promise<string>;
}
//# sourceMappingURL=siwe.controller.d.ts.map