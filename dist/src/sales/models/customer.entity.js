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
exports.Customer = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const agent_entity_1 = require("./agent.entity");
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'C00001',
    }),
    (0, typeorm_1.PrimaryColumn)({
        name: 'cust_code',
        type: 'char',
        length: 6,
        nullable: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "custCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Charles',
    }),
    (0, typeorm_1.Column)({
        name: 'cust_name',
        type: 'char',
        length: 40,
        nullable: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "custName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'New York',
    }),
    (0, typeorm_1.Column)({
        name: 'cust_city',
        type: 'varchar',
        length: 35,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Customer.prototype, "custCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'New York',
    }),
    (0, typeorm_1.Column)({
        name: 'working_area',
        type: 'varchar',
        length: 35,
        nullable: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "workingArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'USA',
    }),
    (0, typeorm_1.Column)({
        name: 'cust_country',
        type: 'varchar',
        length: 20,
        nullable: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "custCountry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2',
    }),
    (0, typeorm_1.Column)({
        name: 'grade',
        type: 'integer',
        precision: 11,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3000',
    }),
    (0, typeorm_1.Column)({
        name: 'opening_amt',
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "openingAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '500',
    }),
    (0, typeorm_1.Column)({
        name: 'receive_amt',
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "receiveAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2000',
    }),
    (0, typeorm_1.Column)({
        name: 'payment_amt',
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "paymentAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6000',
    }),
    (0, typeorm_1.Column)({
        name: 'outstanding_amt',
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "outstandingAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '077-12345674',
    }),
    (0, typeorm_1.Column)({
        name: 'phone_no',
        type: 'varchar',
        length: 17,
        nullable: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => agent_entity_1.Agent,
    }),
    (0, typeorm_1.ManyToOne)(() => agent_entity_1.Agent, (agent) => agent.customers),
    (0, typeorm_1.JoinColumn)({ name: 'agent_code' }),
    __metadata("design:type", agent_entity_1.Agent)
], Customer.prototype, "agentCode", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)({ name: 'customers' })
], Customer);
//# sourceMappingURL=customer.entity.js.map