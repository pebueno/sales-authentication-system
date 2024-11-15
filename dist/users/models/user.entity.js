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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const users_constants_1 = require("../../constants/users.constants");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Caio',
    }),
    (0, typeorm_1.Column)({
        name: 'first_name',
        type: 'char',
        length: 40,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Fleury',
    }),
    (0, typeorm_1.Column)({
        name: 'last_name',
        type: 'char',
        length: 40,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'caio.fleury.r@gmail.com',
    }),
    (0, typeorm_1.Column)({
        name: 'email',
        type: 'char',
        length: 40,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'password',
        type: 'char',
        length: 80,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin',
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: users_constants_1.UserRole,
        default: users_constants_1.UserRole.GUEST,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-08-27T06:14:15.051Z',
    }),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], User.prototype, "createAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-08-27T06:14:15.051Z',
    }),
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], User.prototype, "updateAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map