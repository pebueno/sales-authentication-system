"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS_PAGINATION_ITEMS_PER_PAGE = exports.UserErrorMessage = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["GUEST"] = "guest";
    UserRole["CUSTOMER"] = "customer";
    UserRole["AGENT"] = "agent";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserErrorMessage;
(function (UserErrorMessage) {
    UserErrorMessage["USER_DOES_NOT_EXIST"] = "User does not exist";
    UserErrorMessage["USER_ALREADY_REGISTERED"] = "User already registered";
})(UserErrorMessage || (exports.UserErrorMessage = UserErrorMessage = {}));
exports.USERS_PAGINATION_ITEMS_PER_PAGE = 20;
//# sourceMappingURL=users.constants.js.map