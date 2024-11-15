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
exports.CreateCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const agent_entity_1 = require("../../../models/agent.entity");
class CreateCustomerDto {
}
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'C00001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "custCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Charles',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "custName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'New York',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(35),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "custCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'New York',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(35),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "workingArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'USA',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "custCountry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3000',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "openingAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '500',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "receiveAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2000',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "paymentAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6000',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "outstandingAmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '077-12345674',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", agent_entity_1.Agent)
], CreateCustomerDto.prototype, "agentCode", void 0);
//# sourceMappingURL=create-customer.dto.js.map