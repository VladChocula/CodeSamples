"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSignupRequest = exports.mockCreateUser = exports.mockUser = void 0;
exports.mockUser = {
    id: 'uuid',
    userName: 'johndoe',
    address: 'someethaddress',
    email: 'johndoe@gmail.com',
    profile: {
        id: 'uuid',
        firstName: 'John',
        lastName: 'Doe',
        location: 'location',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.mockCreateUser = {
    address: 'ethaddress',
    userName: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
};
exports.mockSignupRequest = {
    address: 'address',
    userName: 'userName',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
};
//# sourceMappingURL=mocks.js.map