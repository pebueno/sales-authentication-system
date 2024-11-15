"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const bcrypt = __importStar(require("bcryptjs"));
const users_constants_1 = require("../../constants/users.constants");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UsersService = class UsersService {
    constructor(repository) {
        this.repository = repository;
    }
    async findOneByEmail(email) {
        return this.repository.findOne({
            where: {
                email,
            },
        });
    }
    async create(createUserDto) {
        createUserDto.password = await this.encryptPassword(createUserDto.password);
        const user = await this.repository.create(createUserDto);
        return await this.repository.save(user);
    }
    async encryptPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async assignRole(userId, assignUserDto) {
        const user = await this.repository.findOneBy({
            id: userId,
        });
        if (!user) {
            throw new common_1.NotFoundException(users_constants_1.UserErrorMessage.USER_DOES_NOT_EXIST);
        }
        user.role = assignUserDto.role;
        const _a = await this.repository.save(user), { password } = _a, rest = __rest(_a, ["password"]);
        return rest;
    }
    async getAll(options) {
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(this.repository, options);
        const newItems = result.items.map((_a) => {
            var { password } = _a, rest = __rest(_a, ["password"]);
            return rest;
        });
        return new nestjs_typeorm_paginate_1.Pagination(newItems, result.meta, result.links);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map