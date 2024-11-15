"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_guard_1 = require("./roles.guard");
const core_1 = require("@nestjs/core");
const users_constants_1 = require("../../constants/users.constants");
describe('RolesGuard', () => {
    let guard;
    let reflector;
    let mockExecutionContext;
    beforeEach(() => {
        reflector = new core_1.Reflector();
        guard = new roles_guard_1.RolesGuard(reflector);
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue({
                    user: { role: users_constants_1.UserRole.AGENT },
                }),
            }),
            getHandler: jest.fn(),
            getClass: jest.fn(),
        };
    });
    it('should allow access if no roles are required', () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
        expect(guard.canActivate(mockExecutionContext)).toBe(true);
    });
    it('should allow access if the user has one of the required roles', () => {
        jest
            .spyOn(reflector, 'getAllAndOverride')
            .mockReturnValue([users_constants_1.UserRole.AGENT, users_constants_1.UserRole.ADMIN]);
        expect(guard.canActivate(mockExecutionContext)).toBe(true);
    });
    it('should deny access if the user does not have any of the required roles', () => {
        jest
            .spyOn(reflector, 'getAllAndOverride')
            .mockReturnValue([users_constants_1.UserRole.ADMIN]);
        expect(guard.canActivate(mockExecutionContext)).toBe(false);
    });
    it('should allow access if user role matches exactly', () => {
        jest
            .spyOn(reflector, 'getAllAndOverride')
            .mockReturnValue([users_constants_1.UserRole.AGENT]);
        expect(guard.canActivate(mockExecutionContext)).toBe(true);
    });
});
//# sourceMappingURL=roles.guard.spec.js.map