import { Prisma } from '@prisma/client';
export declare const userArgs: {
    select: {
        id: boolean;
        address: boolean;
        userName: boolean;
        email: boolean;
        profile: {
            select: {
                id: boolean;
                firstName: boolean;
                lastName: boolean;
                location: boolean;
                createdAt: boolean;
                updatedAt: boolean;
            };
        };
        createdAt: boolean;
        updatedAt: boolean;
    };
};
declare const userData: {
    select: {
        id: boolean;
        address: boolean;
        userName: boolean;
        email: boolean;
        profile: {
            select: {
                id: boolean;
                firstName: boolean;
                lastName: boolean;
                location: boolean;
                createdAt: boolean;
                updatedAt: boolean;
            };
        };
        createdAt: boolean;
        updatedAt: boolean;
    };
};
export type User = Prisma.UserGetPayload<typeof userData>;
export {};
//# sourceMappingURL=user.types.d.ts.map