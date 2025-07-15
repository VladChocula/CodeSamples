import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserClientAPI } from 'lib-server';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly config;
    private readonly userAPI;
    constructor(config: ConfigService, userAPI: UserClientAPI);
    validate({ id }: {
        id: string;
    }): Promise<any>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map