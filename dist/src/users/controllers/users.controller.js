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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../services/users.service");
const assign_role_dto_1 = require("./dto/assign-role.dto");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const users_constants_1 = require("../../constants/users.constants");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const assign_admin_role_guard_1 = require("../../auth/guards/assign-admin-role.guard");
const user_entity_1 = require("../models/user.entity");
const auth_constants_1 = require("../../constants/auth.constants");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async assignRole(id, assignUserDto) {
        return await this.usersService.assignRole(Number(id), assignUserDto);
    }
    async getAll(req, page) {
        const route = `${req.protocol}://${req.hostname}:${process.env.PORT}${req.path}`;
        return await this.usersService.getAll({
            page,
            limit: users_constants_1.USERS_PAGINATION_ITEMS_PER_PAGE,
            route,
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('assign-role/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, assign_admin_role_guard_1.AssignAdminRoleGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBody)({ type: assign_role_dto_1.AssignUserDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a role to an user by user id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role assigned',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User does not exist',
        schema: {
            example: {
                message: users_constants_1.UserErrorMessage.USER_DOES_NOT_EXIST,
                error: 'Not Found',
                statusCode: 404,
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_role_dto_1.AssignUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "assignRole", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all orders (paginated)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get an array with all the users',
        type: [user_entity_1.User],
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('api/users'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT, users_constants_1.UserRole.CUSTOMER),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map