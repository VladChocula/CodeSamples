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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SiweService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiweService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const siwe_1 = require("siwe");
const constants_1 = require("./constants");
let SiweService = SiweService_1 = class SiweService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(SiweService_1.name);
    }
    async createNonce(address) {
        const nonce = (0, siwe_1.generateNonce)();
        await this.cacheManager.set(address.toLocaleLowerCase(), nonce, constants_1.ONE_MINUTE);
        return nonce;
    }
    async verifyMessage(message, signature) {
        this.logger.log('Verifying siwe message');
        const siweMessage = new siwe_1.SiweMessage(message);
        const cacheNonce = await this.cacheManager.get(siweMessage.address.toLocaleLowerCase());
        if (!cacheNonce || cacheNonce !== siweMessage.nonce) {
            this.logger.error(`Provided nonce: ${siweMessage.nonce}, does not match nonce in cache: ${cacheNonce}, for address: ${siweMessage.address}`);
            throw new common_1.HttpException('Invalid nonce', 422);
        }
        try {
            await siweMessage.verify({ signature, nonce: siweMessage.nonce });
            await this.cacheManager.del(siweMessage.address);
            return siweMessage;
        }
        catch (error) {
            this.logger.error(`Failed to validate siwe message. Error: ${error}`);
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.SiweService = SiweService;
exports.SiweService = SiweService = SiweService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], SiweService);
//# sourceMappingURL=siwe.service.js.map