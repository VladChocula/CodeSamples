import { SignUpDTO } from 'lib-server';
import { UserRepository } from './user.repository';
import { User } from '../prisma/types/user.types';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: UserRepository);
    signup({ address, userName, email, firstName, lastName, }: SignUpDTO): Promise<User>;
}
//# sourceMappingURL=user.service.d.ts.map