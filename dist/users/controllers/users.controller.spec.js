"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("../services/users.service");
const users_constants_1 = require("../../constants/users.constants");
const common_1 = require("@nestjs/common");
describe('UsersController', () => {
    let controller;
    let usersService;
    const mockUser = {
        id: 2,
        email: 'caio.fleury.r@gmail.com',
        firstName: 'Caio',
        lastName: 'Fleury',
        password: 'hashedPassword',
        role: users_constants_1.UserRole.ADMIN,
        createAt: new Date('2024-08-27T10:11:04.408Z'),
        updateAt: new Date('2024-08-27T10:11:04.408Z'),
        deletedAt: null,
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
        usersService = {
            assignRole: jest.fn().mockResolvedValue(mockUser),
            getAll: jest.fn().mockResolvedValue([mockUser]),
        };
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_controller_1.UsersController],
            providers: [
                {
                    provide: users_service_1.UsersService,
                    useValue: usersService,
                },
            ],
        }).compile();
        controller = module.get(users_controller_1.UsersController);
    });
    describe('assignRole', () => {
        it('should assign a role to the user and return the updated user', async () => {
            const assignUserDto = { role: users_constants_1.UserRole.AGENT };
            const result = await controller.assignRole('2', assignUserDto);
            expect(result).toEqual(mockUser);
            expect(usersService.assignRole).toHaveBeenCalledWith(2, assignUserDto);
        });
        it('should throw NotFoundException if the user is not found', async () => {
            jest
                .spyOn(usersService, 'assignRole')
                .mockRejectedValueOnce(new common_1.NotFoundException(users_constants_1.UserErrorMessage.USER_DOES_NOT_EXIST));
            const assignUserDto = { role: users_constants_1.UserRole.AGENT };
            await expect(controller.assignRole('999', assignUserDto)).rejects.toThrow(new common_1.NotFoundException(users_constants_1.UserErrorMessage.USER_DOES_NOT_EXIST));
            expect(usersService.assignRole).toHaveBeenCalledWith(999, assignUserDto);
        });
    });
    describe('getAll', () => {
        it('should return a paginated list of users', async () => {
            const mockRequest = {
                protocol: 'http',
                hostname: 'localhost',
                path: '/api/users',
            };
            const result = await controller.getAll(mockRequest, 1);
            expect(result).toEqual(mockPaginationResult.items);
            expect(usersService.getAll).toHaveBeenCalledWith({
                page: 1,
                limit: 20,
                route: 'http://localhost:undefined/api/users',
            });
        });
        it('should return an empty array if no users are found', async () => {
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
            jest
                .spyOn(usersService, 'getAll')
                .mockResolvedValueOnce(emptyPaginationResult);
            const mockRequest = {
                protocol: 'http',
                hostname: 'localhost',
                path: '/api/users',
            };
            const result = await controller.getAll(mockRequest, 1);
            expect(result.items).toEqual([]);
            expect(result.meta.totalItems).toEqual(0);
            expect(usersService.getAll).toHaveBeenCalledWith({
                page: 1,
                limit: 20,
                route: 'http://localhost:undefined/api/users',
            });
        });
    });
});
//# sourceMappingURL=users.controller.spec.js.map