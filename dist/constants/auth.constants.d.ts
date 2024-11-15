export declare enum AuthErrorMessage {
    ADMIN_ROLE_ASSIGN_REQUIRED = "Only administrators can assign the admin role.",
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN_RESOURCE = "Forbidden"
}
export declare const AuthForbiddenErrorSwagger: {
    status: number;
    description: string;
    schema: {
        example: {
            message: AuthErrorMessage;
            error: string;
            statusCode: number;
        };
    };
};
