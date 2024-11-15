"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthForbiddenErrorSwagger = exports.AuthErrorMessage = void 0;
var AuthErrorMessage;
(function (AuthErrorMessage) {
    AuthErrorMessage["ADMIN_ROLE_ASSIGN_REQUIRED"] = "Only administrators can assign the admin role.";
    AuthErrorMessage["UNAUTHORIZED"] = "Unauthorized";
    AuthErrorMessage["FORBIDDEN_RESOURCE"] = "Forbidden";
})(AuthErrorMessage || (exports.AuthErrorMessage = AuthErrorMessage = {}));
exports.AuthForbiddenErrorSwagger = {
    status: 403,
    description: 'Forbidden resource for the user role',
    schema: {
        example: {
            message: AuthErrorMessage.FORBIDDEN_RESOURCE,
            error: 'Forbidden',
            statusCode: 403,
        },
    },
};
//# sourceMappingURL=auth.constants.js.map