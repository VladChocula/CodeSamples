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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const lib_server_1 = require("lib-server");
const microservices_1 = require("@nestjs/microservices");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
let UserController = exports.UserController = UserController_1 = class UserController {
    constructor(service, repository) {
        this.service = service;
        this.repository = repository;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async getUser({ id, address }) {
        this.logger.log(`Retrieving user ${id || address}`);
        return this.repository.find({ id, address });
    }
    async signup(request) {
        return this.service.signup(request);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)(lib_server_1.GetUserCall),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lib_server_1.GetUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, microservices_1.MessagePattern)(lib_server_1.SignUpCall),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lib_server_1.SignUpDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_repository_1.UserRepository])
], UserController);
//# sourceMappingURL=user.controller.js.map