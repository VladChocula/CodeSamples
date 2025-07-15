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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const lib_server_1 = require("lib-server");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const jwt_service_1 = require("../auth/jwt.service");
const siwe_service_1 = require("../siwe/siwe.service");
const auth_dto_1 = require("./types/auth.dto");
let UserController = UserController_1 = class UserController {
    constructor(jwtService, userAPI, siweService) {
        this.jwtService = jwtService;
        this.userAPI = userAPI;
        this.siweService = siweService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async getUser(req) {
        this.logger.log(`Get user: ${req.user.id}`);
        return this.userAPI.getUser({ id: req.user.id });
    }
    async signup(_a) {
        var { message, signature } = _a, body = __rest(_a, ["message", "signature"]);
        this.logger.log(`Signup user requested`);
        const verified = await this.siweService.verifyMessage(message, signature);
        const user = await this.userAPI.signUp(Object.assign(Object.assign({}, body), { address: verified.address }));
        return this.jwtService.buildAuthRes(user);
    }
    async login({ message, signature }) {
        this.logger.log(`Login user request`);
        try {
            const verified = await this.siweService.verifyMessage(message, signature);
            const user = await this.userAPI.getUser({ address: verified.address });
            return this.jwtService.buildAuthRes(user);
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        lib_server_1.UserClientAPI,
        siwe_service_1.SiweService])
], UserController);
//# sourceMappingURL=user.controller.js.map