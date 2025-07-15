"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../prisma/constants");
const prisma_service_1 = require("../prisma/prisma.service");
const user_types_1 = require("../prisma/types/user.types");
let UserRepository = exports.UserRepository = UserRepository_1 = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(UserRepository_1.name);
    }
    async find(where) {
        return this.prisma.user
            .findUniqueOrThrow(Object.assign({ where }, user_types_1.userArgs))
            .catch((error) => {
            this.logger.error(`Failed to find user, Error: ${error.message}`);
            throw new common_1.NotFoundException();
        });
    }
    async create(data) {
        return this.prisma.user
            .create(Object.assign({ data }, user_types_1.userArgs))
            .catch((error) => {
            if (error.code === constants_1.ERROR_CODES.UNIQUE_CONSTRAINT) {
                this.logger.error(`User exists Error: ${error.message}`);
                throw new common_1.HttpException('User exists', 409);
            }
            this.logger.error(`Failed to create user, Error: ${error.message}`);
            throw new common_1.InternalServerErrorException(`Failed to create user`);
        });
    }
};
exports.UserRepository = UserRepository = UserRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map