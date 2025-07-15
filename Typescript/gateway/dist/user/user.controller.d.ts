import { UserClientAPI, UserDTO } from 'lib-server';
import { JwtService } from '../auth/jwt.service';
import { SiweService } from '../siwe/siwe.service';
import { AuthResponseDTO, LoginDTO, SignUpDTO } from './types/auth.dto';
export declare class UserController {
    private readonly jwtService;
    private readonly userAPI;
    private readonly siweService;
    private readonly logger;
    constructor(jwtService: JwtService, userAPI: UserClientAPI, siweService: SiweService);
    getUser(req: any): Promise<UserDTO>;
    signup({ message, signature, ...body }: SignUpDTO): Promise<AuthResponseDTO>;
    login({ message, signature }: LoginDTO): Promise<AuthResponseDTO>;
}
//# sourceMappingURL=user.controller.d.ts.map