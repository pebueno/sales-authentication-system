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
exports.UpdateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const agent_entity_1 = require("../../../models/agent.entity");
const customer_entity_1 = require("../../../models/customer.entity");
class UpdateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '3000',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "ordAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '1000',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "advanceAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2022-03-27',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateOrderDto.prototype, "ordDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'C00001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", customer_entity_1.Customer)
], UpdateOrderDto.prototype, "custCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'A001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", agent_entity_1.Agent)
], UpdateOrderDto.prototype, "agentCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'SOD',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(60),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "ordDescription", void 0);
//# sourceMappingURL=update-order.dto.js.map