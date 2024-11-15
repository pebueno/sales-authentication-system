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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const agent_entity_1 = require("./agent.entity");
const customer_entity_1 = require("./customer.entity");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '200101',
    }),
    (0, typeorm_1.PrimaryColumn)({
        name: 'ord_num',
        type: 'decimal',
        precision: 6,
        scale: 0,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "ordNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3000',
    }),
    (0, typeorm_1.Column)({
        name: 'ord_amount',
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "ordAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1000',
    }),
    (0, typeorm_1.Column)({
        name: 'advance_amount',
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "advanceAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-03-27',
    }),
    (0, typeorm_1.Column)({
        name: 'ord_date',
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Order.prototype, "ordDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => customer_entity_1.Customer,
    }),
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (custCode) => custCode.custCode),
    (0, typeorm_1.JoinColumn)({ name: 'cust_code' }),
    __metadata("design:type", customer_entity_1.Customer)
], Order.prototype, "custCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => agent_entity_1.Agent,
    }),
    (0, typeorm_1.ManyToOne)(() => agent_entity_1.Agent, (agentCode) => agentCode.agentCode),
    (0, typeorm_1.JoinColumn)({ name: 'agent_code' }),
    __metadata("design:type", agent_entity_1.Agent)
], Order.prototype, "agentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SOD',
    }),
    (0, typeorm_1.Column)({
        name: 'ord_description',
        type: 'varchar',
        length: 60,
        nullable: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "ordDescription", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' })
], Order);
//# sourceMappingURL=order.entity.js.map