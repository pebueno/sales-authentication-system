import { Request } from 'express';
import { UsersService } from '../services/users.service';
import { AssignUserDto } from './dto/assign-role.dto';
import { User } from '../models/user.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    assignRole(id: string, assignUserDto: AssignUserDto): Promise<User>;
    getAll(req: Request, page: 1): Promise<Pagination<User>>;
}
