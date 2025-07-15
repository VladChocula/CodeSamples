import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AuthResponseDTO } from '../user/types/auth.dto';
export declare class JwtService {
    private readonly jwt;
    constructor(jwt: NestJwtService);
    buildAuthRes({ id }: {
        id: string;
    }): Promise<AuthResponseDTO>;
}
//# sourceMappingURL=jwt.service.d.ts.map