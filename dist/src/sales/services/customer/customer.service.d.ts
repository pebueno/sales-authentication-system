import { CreateCustomerDto } from '../../controllers/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../controllers/customer/dto/update-customer.dto';
import { Customer } from '../../models/customer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
export declare class CustomerService {
    private repository;
    constructor(repository: Repository<Customer>);
    findAll(): Promise<Customer[] | undefined>;
    findOneById(custCode: any): Promise<Customer | undefined>;
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    update(custCode: any, updateCustomerDto: UpdateCustomerDto): Promise<UpdateResult>;
    delete(custCode: string): Promise<DeleteResult>;
}
