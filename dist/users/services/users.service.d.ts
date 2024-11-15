import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../../auth/controllers/dto/create-user.dto';
import { AssignUserDto } from '../controllers/dto/assign-role.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UsersService {
    private repository;
    constructor(repository: Repository<User>);
    findOneByEmail(email: string): Promise<User | undefined>;
    create(createUserDto: CreateUserDto): Promise<User>;
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    assignRole(userId: number, assignUserDto: AssignUserDto): Promise<User>;
    getAll(options: IPaginationOptions): Promise<Pagination<User>>;
}
