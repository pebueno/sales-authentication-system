import { AuthService } from './../services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
