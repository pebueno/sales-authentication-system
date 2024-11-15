import { Pagination } from 'nestjs-typeorm-paginate';
import { Order } from '../../models/order.entity';
import { OrderService } from '../../services/order/order.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    totalAmoutByCustomer(): Promise<any>;
    totalAmoutByAgent(): Promise<any>;
    totalAmoutByCountry(): Promise<any>;
    findAll(req: Request, page: 1): Promise<Pagination<Order>>;
    findById(ordNum: number): Promise<Order>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(ordNum: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult>;
    delete(ordNum: number): Promise<DeleteResult>;
}
