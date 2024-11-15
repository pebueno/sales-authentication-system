import { UserRole } from '../../../constants/users.constants';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    password: string;
}
