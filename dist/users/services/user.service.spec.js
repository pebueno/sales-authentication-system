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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const testing_1 = require("@nestjs/testing");
const users_service_1 = require("./users.service");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const common_1 = require("@nestjs/common");
const users_constants_1 = require("../../constants/users.constants");
jest.mock('nestjs-typeorm-paginate', () => {
    const actualModule = jest.requireActual('nestjs-typeorm-paginate');
    return Object.assign(Object.assign({}, actualModule), { paginate: jest.fn(), Pagination: jest.fn().mockImplementation((items, meta, links) => ({
            items,
            meta,
            links,
        })) });
});
jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));
describe('UsersService', () => {
    let service;
    let repository;
    const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        role: users_constants_1.UserRole.ADMIN,
    };
    const mockPaginationResult = {
        items: [mockUser],
        meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
        },
        links: {
            first: 'link',
            previous: '',
            next: '',
            last: 'link',
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                users_service_1.UsersService,
                {
                    provide: (0, typeorm_2.getRepositoryToken)(user_entity_1.User),
                    useClass: typeorm_1.Repository,
                },
            ],
        }).compile();
        service = module.get(users_service_1.UsersService);
        repository = module.get((0, typeorm_2.getRepositoryToken)(user_entity_1.User));
    });
    describe('findOneByEmail', () => {
        it('should return a user if found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);
            const result = await service.findOneByEmail('test@example.com');
            expect(result).toEqual(mockUser);
        });
        it('should return undefined if user is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
            const result = await service.findOneByEmail('nonexistent@example.com');
            expect(result).toBeUndefined();
        });
    });
    describe('create', () => {
        it('should create and return a new user', async () => {
            const createUserDto = {
                email: 'newuser@example.com',
                firstName: 'test',
                lastName: 'test',
                password: 'password123',
                role: users_constants_1.UserRole.AGENT,
            };
            const hashedPassword = 'hashedPassword123';
            bcrypt.hash.mockResolvedValue(hashedPassword);
            jest.spyOn(repository, 'create').mockReturnValue(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
            jest.spyOn(repository, 'save').mockResolvedValue(Object.assign(Object.assign({}, createUserDto), { deletedAt: null, id: 1, createAt: new Date('2024-08-27T10:11:04.408Z'), updateAt: new Date('2024-08-27T10:11:04.408Z'), password: hashedPassword }));
            const result = await service.create(createUserDto);
            expect(result).toEqual(Object.assign(Object.assign({}, createUserDto), { id: 1, deletedAt: null, createAt: new Date('2024-08-27T10:11:04.408Z'), updateAt: new Date('2024-08-27T10:11:04.408Z') }));
        });
    });
    describe('encryptPassword', () => {
        it('should return a hashed password', async () => {
            const password = 'password123';
            const hashedPassword = 'hashedPassword123';
            bcrypt.hash.mockResolvedValue(hashedPassword);
            const result = await service.encryptPassword(password);
            expect(result).toEqual(hashedPassword);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
        });
    });
    describe('comparePassword', () => {
        it('should return true if passwords match', async () => {
            const password = 'password123';
            const hash = 'hashedPassword123';
            bcrypt.compare.mockResolvedValue(true);
            const result = await service.comparePassword(password, hash);
            expect(result).toBe(true);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
        });
        it('should return false if passwords do not match', async () => {
            const password = 'password123';
            const hash = 'hashedPassword123';
            bcrypt.compare.mockResolvedValue(false);
            const result = await service.comparePassword(password, hash);
            expect(result).toBe(false);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
        });
    });
    describe('assignRole', () => {
        it('should update the user role and return the updated user without password', async () => {
            const assignUserDto = {
                role: users_constants_1.UserRole.ADMIN,
            };
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser);
            jest.spyOn(repository, 'save').mockResolvedValue(Object.assign(Object.assign({}, mockUser), { role: assignUserDto.role }));
            const result = await service.assignRole(1, assignUserDto);
            expect(result).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                role: users_constants_1.UserRole.ADMIN,
            });
        });
        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);
            const assignUserDto = {
                role: users_constants_1.UserRole.ADMIN,
            };
            await expect(service.assignRole(999, assignUserDto)).rejects.toThrow(new common_1.NotFoundException(users_constants_1.UserErrorMessage.USER_DOES_NOT_EXIST));
        });
    });
    describe('getAll', () => {
        it('should return a paginated list of users without passwords', async () => {
            nestjs_typeorm_paginate_1.paginate.mockResolvedValueOnce(mockPaginationResult);
            const options = { page: 1, limit: 10 };
            const result = await service.getAll(options);
            expect(result.items).toEqual(mockPaginationResult.items.map((_a) => {
                var { password } = _a, rest = __rest(_a, ["password"]);
                return rest;
            }));
            expect(result.meta).toEqual(mockPaginationResult.meta);
            expect(result.links).toEqual(mockPaginationResult.links);
        });
        it('should return an empty paginated list when no users are found', async () => {
            const emptyPaginationResult = {
                items: [],
                meta: {
                    totalItems: 0,
                    itemCount: 0,
                    itemsPerPage: 10,
                    totalPages: 0,
                    currentPage: 1,
                },
                links: {
                    first: 'link',
                    previous: '',
                    next: '',
                    last: 'link',
                },
            };
            nestjs_typeorm_paginate_1.paginate.mockResolvedValueOnce(emptyPaginationResult);
            const options = { page: 1, limit: 10 };
            const result = await service.getAll(options);
            expect(result.items).toEqual([]);
            expect(result.meta.totalItems).toBe(0);
            expect(result.meta.itemCount).toBe(0);
            expect(result.meta.totalPages).toBe(0);
            expect(result.links).toEqual(emptyPaginationResult.links);
        });
    });
});
//# sourceMappingURL=user.service.spec.js.map