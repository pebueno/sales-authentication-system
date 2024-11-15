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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const local_auth_guard_1 = require("./../guards/local-auth.guard");
const auth_service_1 = require("./../services/auth.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const registration_guard_1 = require("../guards/registration.guard");
const users_constants_1 = require("../../constants/users.constants");
const auth_constants_1 = require("../../constants/auth.constants");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(createUserDto) {
        const user = await this.authService.userExists(createUserDto.email);
        if (user) {
            throw new common_1.HttpException(users_constants_1.UserErrorMessage.USER_ALREADY_REGISTERED, common_1.HttpStatus.CONFLICT);
        }
        return await this.authService.createUser(createUserDto);
    }
    async login(req) {
        return this.authService.login(req.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)(registration_guard_1.RegistrationGuard),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Register a new user',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5IiwiZW1haWwiOiJlbWFpbEBkZW1vLmNvbSIsImlhdCI6MTY1MjA0NzQzNSwiZXhwIjoxNjUyMTMzODM1fQ.ikFigJQn1ttuPAV06Yjr4PL6lKvm_HMygcTU8N1P__0',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'User already registered',
        schema: {
            example: {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: users_constants_1.UserErrorMessage.USER_ALREADY_REGISTERED,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Unauthorized: Only administrators are allowed to assign the admin role.',
        schema: {
            example: {
                message: auth_constants_1.AuthErrorMessage.ADMIN_ROLE_ASSIGN_REQUIRED,
                error: 'Unauthorized',
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Get a new access token with the credentials' }),
    (0, swagger_1.ApiBody)({
        schema: {
            example: {
                email: 'email@demo.com',
                password: 'password',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get a new access token with the credentials',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5IiwiZW1haWwiOiJlbWFpbEBkZW1vLmNvbSIsImlhdCI6MTY1MjA0NzQzNSwiZXhwIjoxNjUyMTMzODM1fQ.ikFigJQn1ttuPAV06Yjr4PL6lKvm_HMygcTU8N1P__0',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        schema: {
            example: {
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: auth_constants_1.AuthErrorMessage.UNAUTHORIZED,
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map