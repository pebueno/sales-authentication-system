"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationGuard = void 0;
const common_1 = require("@nestjs/common");
const users_constants_1 = require("../../constants/users.constants");
const auth_constants_1 = require("../../constants/auth.constants");
let RegistrationGuard = class RegistrationGuard {
    canActivate(context) {
        const { body } = context.switchToHttp().getRequest();
        if (body.role === users_constants_1.UserRole.ADMIN) {
            throw new common_1.UnauthorizedException(auth_constants_1.AuthErrorMessage.ADMIN_ROLE_ASSIGN_REQUIRED);
        }
        return true;
    }
};
exports.RegistrationGuard = RegistrationGuard;
exports.RegistrationGuard = RegistrationGuard = __decorate([
    (0, common_1.Injectable)()
], RegistrationGuard);
//# sourceMappingURL=registration.guard.js.map