import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../prisma/types/user.types';
export declare class UserRepository {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    find(where: Prisma.UserWhereUniqueInput): Promise<User>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}
//# sourceMappingURL=user.repository.d.ts.map