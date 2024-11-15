"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const local_strategy_1 = require("./local.strategy");
const auth_service_1 = require("../services/auth.service");
const common_1 = require("@nestjs/common");
const users_constants_1 = require("../../constants/users.constants");
describe('LocalStrategy', () => {
    let strategy;
    let authService;
    beforeEach(async () => {
        authService = {
            validateUserLocal: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                local_strategy_1.LocalStrategy,
                {
                    provide: auth_service_1.AuthService,
                    useValue: authService,
                },
            ],
        }).compile();
        strategy = module.get(local_strategy_1.LocalStrategy);
    });
    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });
    describe('validate', () => {
        it('should return the user if validation is successful', async () => {
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
            jest.spyOn(authService, 'validateUserLocal').mockResolvedValue(mockUser);
            const result = await strategy.validate('user@example.com', 'password123');
            expect(result).toEqual(mockUser);
            expect(authService.validateUserLocal).toHaveBeenCalledWith('user@example.com', 'password123');
        });
        it('should throw UnauthorizedException if validation fails', async () => {
            jest.spyOn(authService, 'validateUserLocal').mockResolvedValue(null);
            await expect(strategy.validate('user@example.com', 'wrongPassword')).rejects.toThrow(common_1.UnauthorizedException);
            expect(authService.validateUserLocal).toHaveBeenCalledWith('user@example.com', 'wrongPassword');
        });
    });
});
//# sourceMappingURL=local.strategy.spec.js.map