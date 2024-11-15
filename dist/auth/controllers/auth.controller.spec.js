"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("../services/auth.service");
const registration_guard_1 = require("../guards/registration.guard");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const common_1 = require("@nestjs/common");
const users_constants_1 = require("../../constants/users.constants");
describe('AuthController', () => {
    let controller;
    let authService;
    const mockUser = {
        id: 9,
        firstName: 'test',
        lastName: 'test',
        createAt: new Date('2024-08-27T10:11:04.408Z'),
        updateAt: new Date('2024-08-27T10:11:04.408Z'),
        deletedAt: null,
        role: users_constants_1.UserRole.CUSTOMER,
        email: 'email@demo.com',
        password: 'hashedPassword',
    };
    const mockToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5IiwiZW1haWwiOiJlbWFpbEBkZW1vLmNvbSIsImlhdCI6MTY1MjA0NzQzNSwiZXhwIjoxNjUyMTMzODM1fQ.ikFigJQn1ttuPAV06Yjr4PL6lKvm_HMygcTU8N1P__0',
    };
    beforeEach(async () => {
        authService = {
            userExists: jest.fn(),
            createUser: jest.fn(),
            login: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            controllers: [auth_controller_1.AuthController],
            providers: [
                {
                    provide: auth_service_1.AuthService,
                    useValue: authService,
                },
            ],
        })
            .overrideGuard(registration_guard_1.RegistrationGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(local_auth_guard_1.LocalAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();
        controller = module.get(auth_controller_1.AuthController);
    });
    describe('register', () => {
        it('should register a new user and return access_token', async () => {
            const createUserDto = {
                email: 'email@demo.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
                role: users_constants_1.UserRole.CUSTOMER,
            };
            jest.spyOn(authService, 'userExists').mockResolvedValue(null);
            jest.spyOn(authService, 'createUser').mockResolvedValue(mockToken);
            const result = await controller.register(createUserDto);
            expect(result).toEqual(mockToken);
            expect(authService.userExists).toHaveBeenCalledWith(createUserDto.email);
            expect(authService.createUser).toHaveBeenCalledWith(createUserDto);
        });
        it('should throw ConflictException if the user already exists', async () => {
            const createUserDto = {
                email: 'email@demo.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
                role: users_constants_1.UserRole.CUSTOMER,
            };
            jest.spyOn(authService, 'userExists').mockResolvedValue(mockUser);
            await expect(controller.register(createUserDto)).rejects.toThrow(new common_1.HttpException(users_constants_1.UserErrorMessage.USER_ALREADY_REGISTERED, common_1.HttpStatus.CONFLICT));
            expect(authService.userExists).toHaveBeenCalledWith(createUserDto.email);
            expect(authService.createUser).not.toHaveBeenCalled();
        });
    });
    describe('login', () => {
        it('should return an access token when credentials are valid', async () => {
            const req = { user: mockUser };
            jest.spyOn(authService, 'login').mockResolvedValue(mockToken);
            const result = await controller.login(req);
            expect(result).toEqual(mockToken);
            expect(authService.login).toHaveBeenCalledWith(req.user);
        });
        it('should return UnauthorizedException if credentials are invalid', async () => {
            const req = { user: null };
            jest.spyOn(authService, 'login').mockResolvedValue(null);
            const result = await controller.login(req);
            expect(result).toBeNull();
            expect(authService.login).toHaveBeenCalledWith(req.user);
        });
    });
});
//# sourceMappingURL=auth.controller.spec.js.map