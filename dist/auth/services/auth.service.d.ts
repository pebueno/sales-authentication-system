import { UsersService } from './../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './../../users/models/user.entity';
import { CreateUserDto } from '../controllers/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserLocal(email: string, password: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
    }>;
    userExists(email: string): Promise<User>;
    createUser(userDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
