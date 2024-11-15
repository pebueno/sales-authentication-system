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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../../services/customer/customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const users_constants_1 = require("../../../constants/users.constants");
const auth_constants_1 = require("../../../constants/auth.constants");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async findAll() {
        return this.customerService.findAll();
    }
    async findById(custCode) {
        const data = await this.customerService.findOneById(custCode);
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return data;
    }
    async create(createCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }
    async update(custCode, updateCustomerDto) {
        return this.customerService.update(custCode, updateCustomerDto);
    }
    async delete(custCode) {
        return this.customerService.delete(custCode);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all customers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get an array with all customers',
        schema: {
            example: [
                {
                    custCode: 'C00001',
                    custName: 'Charles',
                    custCity: 'New York',
                    workingArea: 'New York',
                    custCountry: 'USA',
                    grade: 2,
                    openingAmt: '3000.00',
                    receiveAmt: '500.00',
                    paymentAmt: '2000.00',
                    outstandingAmt: '6000.00',
                    phoneNo: '077-12345674',
                    agentCode: {
                        agentCode: 'A001',
                        agentName: 'Jhon Smith',
                        workingArea: 'London',
                        commission: '0.10',
                        phoneNo: '077-12345674',
                        country: 'USA',
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':custCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Get customer by custCode with its agent' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer data by custCode',
        schema: {
            example: {
                custCode: 'C00001',
                custName: 'Charles',
                custCity: 'New York',
                workingArea: 'New York',
                custCountry: 'USA',
                grade: 2,
                openingAmt: '3000.00',
                receiveAmt: '500.00',
                paymentAmt: '2000.00',
                outstandingAmt: '6000.00',
                phoneNo: '077-12345674',
                agentCode: {
                    agentCode: 'A001',
                    agentName: 'Jhon Smith',
                    workingArea: 'London',
                    commission: '0.10',
                    phoneNo: '077-12345674',
                    country: 'USA',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Customer not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('custCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new customer' }),
    (0, swagger_1.ApiBody)({ type: create_customer_dto_1.CreateCustomerDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Customer successfully created',
        schema: {
            example: {
                custCode: 'C00001',
                custName: 'Charles',
                custCity: 'New York',
                workingArea: 'New York',
                custCountry: 'USA',
                grade: 2,
                openingAmt: '3000',
                receiveAmt: '500',
                paymentAmt: '2000',
                outstandingAmt: '6000',
                phoneNo: '077-12345674',
                agentCode: 'A001',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Customer failed to be created due to wrong parameters format',
        schema: {
            example: {
                statusCode: 400,
                message: ['receiveAmt is not a valid decimal number.'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':custCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing customer' }),
    (0, swagger_1.ApiBody)({ type: update_customer_dto_1.UpdateCustomerDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer successfully updated',
        schema: {
            example: {
                generatedMaps: [],
                raw: [],
                affected: 1,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Customer failed to be updated due to wrong parameters format',
        schema: {
            example: {
                statusCode: 400,
                message: ['receiveAmt is not a valid decimal number.'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('custCode')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':custCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an existing customer by its custCode' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer successfully deleted',
        schema: {
            example: {
                generatedMaps: [],
                raw: [],
                affected: 1,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Customer was not deleted because forein key constraint',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('custCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "delete", null);
exports.CustomerController = CustomerController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.CUSTOMER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('/api/customers'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map