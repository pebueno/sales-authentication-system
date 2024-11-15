import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AssignAdminRoleGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}
