import { Customer } from '../../models/customer.entity';
import { CustomerService } from '../../services/customer/customer.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    findAll(): Promise<Customer[]>;
    findById(custCode: string): Promise<Customer>;
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    update(custCode: string, updateCustomerDto: UpdateCustomerDto): Promise<UpdateResult>;
    delete(custCode: string): Promise<DeleteResult>;
}
