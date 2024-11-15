import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RegistrationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
