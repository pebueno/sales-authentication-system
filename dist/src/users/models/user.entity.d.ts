import { UserRole } from '../../constants/users.constants';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    createAt: Date;
    updateAt: Date;
    deletedAt: Date;
}
