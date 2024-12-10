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
exports.CreateAgentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAgentDto {
}
exports.CreateAgentDto = CreateAgentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "agentCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Jhon Smith',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "agentName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'London',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(35),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "workingArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '0.10',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], CreateAgentDto.prototype, "commission", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '077-12345674',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'USA',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(25),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "country", void 0);
//# sourceMappingURL=create-agent.dto.js.map