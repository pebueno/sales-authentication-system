"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("./../../users/services/users.service");
const jwt_1 = require("@nestjs/jwt");
const users_constants_1 = require("../../constants/users.constants");
describe('AuthService', () => {
    let service;
    let usersService;
    let jwtService;
    const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        role: users_constants_1.UserRole.ADMIN,
    };
    beforeEach(async () => {
        usersService = {
            findOneByEmail: jest.fn().mockResolvedValue(mockUser),
            comparePassword: jest.fn().mockResolvedValue(true),
            create: jest.fn().mockResolvedValue(mockUser),
        };
        jwtService = {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                { provide: users_service_1.UsersService, useValue: usersService },
                { provide: jwt_1.JwtService, useValue: jwtService },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
    });
    describe('validateUserLocal', () => {
        it('should return user data without password if validation is successful', async () => {
            const result = await service.validateUserLocal('test@example.com', 'password');
            expect(result).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                role: mockUser.role,
            });
        });
        it('should return null if user is not found', async () => {
            usersService.findOneByEmail.mockResolvedValueOnce(null);
            const result = await service.validateUserLocal('test@example.com', 'password');
            expect(result).toBeNull();
        });
        it('should return null if password does not match', async () => {
            usersService.comparePassword.mockResolvedValueOnce(false);
            const result = await service.validateUserLocal('test@example.com', 'wrongPassword');
            expect(result).toBeNull();
        });
    });
    describe('login', () => {
        it('should return an access token', async () => {
            const result = await service.login(mockUser);
            expect(result).toEqual({
                access_token: 'mockJwtToken',
            });
            expect(jwtService.sign).toHaveBeenCalledWith({
                userId: mockUser.id,
                email: mockUser.email,
                role: mockUser.role,
            });
        });
    });
    describe('userExists', () => {
        it('should return user if it exists', async () => {
            const result = await service.userExists('test@example.com');
            expect(result).toEqual(mockUser);
        });
        it('should return null if user does not exist', async () => {
            usersService.findOneByEmail.mockResolvedValueOnce(null);
            const result = await service.userExists('nonexistent@example.com');
            expect(result).toBeNull();
        });
    });
    describe('createUser', () => {
        it('should create a new user and return an access token', async () => {
            const createUserDto = {
                email: 'test@test.com',
                firstName: 'test',
                lastName: 'test',
                password: 'test',
                role: users_constants_1.UserRole.AGENT,
            };
            const result = await service.createUser(createUserDto);
            expect(result).toEqual({
                access_token: 'mockJwtToken',
            });
            expect(usersService.create).toHaveBeenCalledWith(createUserDto);
            expect(jwtService.sign).toHaveBeenCalledWith({
                userId: mockUser.id,
                email: mockUser.email,
                role: mockUser.role,
            });
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map