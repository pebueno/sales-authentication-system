import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { CreateOrderDto } from '../../controllers/order/dto/create-order.dto';
import { UpdateOrderDto } from '../../controllers/order/dto/update-order.dto';
import { Order } from '../../models/order.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
export declare class OrderService {
    private repository;
    constructor(repository: Repository<Order>);
    findAll(options: IPaginationOptions): Promise<Pagination<Order>>;
    findOneById(ordNum: number): Promise<Order | undefined>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(ordNum: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult>;
    delete(ordNum: number): Promise<DeleteResult>;
    totalAmountByCustomer(): Promise<any>;
    totalAmountByAgent(): Promise<any>;
    totalAmountByCountry(): Promise<any>;
}
