"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userArgs = void 0;
const client_1 = require("@prisma/client");
exports.userArgs = {
    select: {
        id: true,
        address: true,
        userName: true,
        email: true,
        profile: {
            select: {
                id: true,
                firstName: true,
                lastName: true,
                location: true,
                createdAt: true,
                updatedAt: true,
            },
        },
        createdAt: true,
        updatedAt: true,
    },
};
const userData = client_1.Prisma.validator()(exports.userArgs);
//# sourceMappingURL=user.types.js.map