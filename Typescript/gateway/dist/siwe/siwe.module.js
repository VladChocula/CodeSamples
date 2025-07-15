"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiweModule = void 0;
const common_1 = require("@nestjs/common");
const siwe_service_1 = require("./siwe.service");
const siwe_controller_1 = require("./siwe.controller");
const cache_manager_1 = require("@nestjs/cache-manager");
let SiweModule = class SiweModule {
};
exports.SiweModule = SiweModule;
exports.SiweModule = SiweModule = __decorate([
    (0, common_1.Module)({
        imports: [cache_manager_1.CacheModule.register()],
        providers: [siwe_service_1.SiweService],
        controllers: [siwe_controller_1.SiweController],
        exports: [siwe_service_1.SiweService],
    })
], SiweModule);
//# sourceMappingURL=siwe.module.js.map