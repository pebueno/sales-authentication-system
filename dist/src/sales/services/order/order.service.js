"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const customer_entity_1 = require("../../models/customer.entity");
const order_entity_1 = require("../../models/order.entity");
const typeorm_2 = require("typeorm");
let OrderService = class OrderService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(options) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.repository, options, {
            relations: ['agentCode', 'custCode'],
        });
    }
    async findOneById(ordNum) {
        return this.repository.findOne({
            where: {
                ordNum,
            },
            relations: ['agentCode', 'custCode'],
        });
    }
    async create(createOrderDto) {
        const order = await this.repository.create(createOrderDto);
        return await this.repository.save(order);
    }
    async update(ordNum, updateOrderDto) {
        return this.repository.update(ordNum, updateOrderDto);
    }
    async delete(ordNum) {
        return this.repository.delete(ordNum);
    }
    async totalAmountByCustomer() {
        return await this.repository
            .createQueryBuilder('orders')
            .select('orders.cust_code', 'custCode')
            .addSelect('SUM(orders.ord_amount)', 'totalOrdAmount')
            .groupBy('orders.cust_code')
            .getRawMany();
    }
    async totalAmountByAgent() {
        return await this.repository
            .createQueryBuilder('orders')
            .select('orders.agent_code', 'agentCode')
            .addSelect('SUM(orders.ord_amount)', 'totalOrdAmount')
            .groupBy('orders.agent_code')
            .getRawMany();
    }
    async totalAmountByCountry() {
        return await this.repository
            .createQueryBuilder('orders')
            .leftJoin(customer_entity_1.Customer, 'customer', 'orders.cust_code = customer.cust_code')
            .select('customer.cust_country', 'custCountry')
            .addSelect('SUM(orders.ord_amount)', 'totalOrdAmount')
            .groupBy('customer.cust_country')
            .getRawMany();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map