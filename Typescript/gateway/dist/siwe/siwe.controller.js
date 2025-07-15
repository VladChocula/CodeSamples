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
var SiweController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiweController = void 0;
const common_1 = require("@nestjs/common");
const siwe_service_1 = require("./siwe.service");
const siwe_dto_1 = require("./types/siwe.dto");
let SiweController = SiweController_1 = class SiweController {
    constructor(siweService) {
        this.siweService = siweService;
        this.logger = new common_1.Logger(SiweController_1.name);
    }
    async getNonce({ address }) {
        this.logger.log('Get nonce request');
        return this.siweService.createNonce(address);
    }
};
exports.SiweController = SiweController;
__decorate([
    (0, common_1.Get)('/nonce/:address'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [siwe_dto_1.GetNonceDTO]),
    __metadata("design:returntype", Promise)
], SiweController.prototype, "getNonce", null);
exports.SiweController = SiweController = SiweController_1 = __decorate([
    (0, common_1.Controller)('siwe'),
    __metadata("design:paramtypes", [siwe_service_1.SiweService])
], SiweController);
//# sourceMappingURL=siwe.controller.js.map