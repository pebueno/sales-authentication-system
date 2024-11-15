"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assign_admin_role_guard_1 = require("./assign-admin-role.guard");
const users_constants_1 = require("../../constants/users.constants");
describe('AssignAdminRoleGuard', () => {
    let guard;
    let mockExecutionContext;
    beforeEach(() => {
        guard = new assign_admin_role_guard_1.AssignAdminRoleGuard();
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue({
                    user: {},
                    body: {},
                }),
            }),
        };
    });
    it('should allow access if the assigned role is not ADMIN', () => {
        const mockRequest = {
            user: { role: users_constants_1.UserRole.AGENT },
            body: { role: users_constants_1.UserRole.AGENT },
        };
        jest
            .spyOn(mockExecutionContext.switchToHttp(), 'getRequest')
            .mockReturnValue(mockRequest);
        expect(guard.canActivate(mockExecutionContext)).toBe(true);
    });
    it('should allow access if the user role is ADMIN and the assigned role is ADMIN', () => {
        const mockRequest = {
            user: { role: users_constants_1.UserRole.ADMIN },
            body: { role: users_constants_1.UserRole.ADMIN },
        };
        jest
            .spyOn(mockExecutionContext.switchToHttp(), 'getRequest')
            .mockReturnValue(mockRequest);
        expect(guard.canActivate(mockExecutionContext)).toBe(true);
    });
    it('should deny access if the user is not ADMIN and tries to assign the ADMIN role', () => {
        const mockRequest = {
            user: { role: users_constants_1.UserRole.AGENT },
            body: { role: users_constants_1.UserRole.ADMIN },
        };
        jest
            .spyOn(mockExecutionContext.switchToHttp(), 'getRequest')
            .mockReturnValue(mockRequest);
        expect(guard.canActivate(mockExecutionContext)).toBe(false);
    });
});
//# sourceMappingURL=assign-admin-role.guard.spec.js.map