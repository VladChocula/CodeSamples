import { GetUserDTO, SignUpDTO } from 'lib-server';
import { User } from '../prisma/types/user.types';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
export declare class UserController {
    private readonly service;
    private readonly repository;
    private readonly logger;
    constructor(service: UserService, repository: UserRepository);
    getUser({ id, address }: GetUserDTO): Promise<User>;
    signup(request: SignUpDTO): Promise<User>;
}
//# sourceMappingURL=user.controller.d.ts.map