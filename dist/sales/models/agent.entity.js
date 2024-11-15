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
exports.Agent = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
let Agent = class Agent {
};
exports.Agent = Agent;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A001',
    }),
    (0, typeorm_1.PrimaryColumn)({
        name: 'agent_code',
        type: 'char',
        length: 6,
        nullable: false,
    }),
    __metadata("design:type", String)
], Agent.prototype, "agentCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Jhon Smith',
    }),
    (0, typeorm_1.Column)({
        name: 'agent_name',
        type: 'char',
        length: 40,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Agent.prototype, "agentName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'London',
    }),
    (0, typeorm_1.Column)({
        name: 'working_area',
        type: 'char',
        length: 35,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Agent.prototype, "workingArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '0.10',
    }),
    (0, typeorm_1.Column)({
        name: 'commission',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Number)
], Agent.prototype, "commission", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '077-12345674',
    }),
    (0, typeorm_1.Column)({
        name: 'phone_no',
        type: 'char',
        length: 15,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Agent.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'USA',
    }),
    (0, typeorm_1.Column)({
        name: 'country',
        type: 'varchar',
        length: 25,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Agent.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: () => customer_entity_1.Customer,
        isArray: true,
    }),
    (0, typeorm_1.OneToMany)(() => customer_entity_1.Customer, (customer) => customer.agentCode),
    __metadata("design:type", Array)
], Agent.prototype, "customers", void 0);
exports.Agent = Agent = __decorate([
    (0, typeorm_1.Entity)({ name: 'agents' })
], Agent);
//# sourceMappingURL=agent.entity.js.map