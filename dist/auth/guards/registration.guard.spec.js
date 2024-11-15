"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registration_guard_1 = require("./registration.guard");
const common_1 = require("@nestjs/common");
const users_constants_1 = require("../../constants/users.constants");
const auth_constants_1 = require("../../constants/auth.constants");
describe('RegistrationGuard', () => {
    let guard;
    let mockExecutionContext;
    beforeEach(() => {
        guard = new registration_guard_1.RegistrationGuard();
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue({
                    body: {},
                }),
            }),
        };
    });
    it('should allow access if the role is not ADMIN', () => {
        const mockRequest = {
            body: { role: users_constants_1.UserRole.AGENT },
        };
        jest
            .spyOn(mockExecutionContext.switchToHttp(), 'getRequest')
            .mockReturnValue(mockRequest);
        expect(guard.canActivate(mockExecutionContext)).toBe(true);
    });
    it('should throw UnauthorizedException if the role is ADMIN', () => {
        const mockRequest = {
            body: { role: users_constants_1.UserRole.ADMIN },
        };
        jest
            .spyOn(mockExecutionContext.switchToHttp(), 'getRequest')
            .mockReturnValue(mockRequest);
        expect(() => guard.canActivate(mockExecutionContext)).toThrow(new common_1.UnauthorizedException(auth_constants_1.AuthErrorMessage.ADMIN_ROLE_ASSIGN_REQUIRED));
    });
});
//# sourceMappingURL=registration.guard.spec.js.map