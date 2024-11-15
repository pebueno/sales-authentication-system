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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("../../services/order/order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const sales_constants_1 = __importDefault(require("../../../constants/sales.constants"));
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const users_constants_1 = require("../../../constants/users.constants");
const auth_constants_1 = require("../../../constants/auth.constants");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async totalAmoutByCustomer() {
        return await this.orderService.totalAmountByCustomer();
    }
    async totalAmoutByAgent() {
        return await this.orderService.totalAmountByAgent();
    }
    async totalAmoutByCountry() {
        return await this.orderService.totalAmountByCountry();
    }
    async findAll(req, page) {
        const route = `${req.protocol}://${req.hostname}:${process.env.PORT}${req.path}`;
        return this.orderService.findAll({
            page,
            limit: sales_constants_1.default.PAGINATION_ITEMS_PER_PAGE,
            route,
        });
    }
    async findById(ordNum) {
        const data = await this.orderService.findOneById(ordNum);
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return data;
    }
    async create(createOrderDto) {
        return this.orderService.create(createOrderDto);
    }
    async update(ordNum, updateOrderDto) {
        return this.orderService.update(ordNum, updateOrderDto);
    }
    async delete(ordNum) {
        return this.orderService.delete(ordNum);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)('total-amount-by-customer'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Get total amount of orders group by customer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get an array with sum of all orders grouped by customer',
        schema: {
            example: [
                {
                    custCode: 'C00001',
                    totalOrdAmount: '3000.00',
                },
                {
                    custCode: 'C00002',
                    totalOrdAmount: '3500.00',
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "totalAmoutByCustomer", null);
__decorate([
    (0, common_1.Get)('total-amount-by-agent'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT),
    (0, swagger_1.ApiOperation)({ summary: 'Get total amount of orders group by agent' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get an array with sum of all orders grouped by agent',
        schema: {
            example: [
                {
                    agentCode: 'A001',
                    totalOrdAmount: '800.00',
                },
                {
                    agentCode: 'A002',
                    totalOrdAmount: '12700.00',
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "totalAmoutByAgent", null);
__decorate([
    (0, common_1.Get)('total-amount-by-country'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT, users_constants_1.UserRole.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Get total amount of orders group by country' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get an array with sum of all orders grouped by country',
        schema: {
            example: [
                {
                    custCountry: 'Australia',
                    totalOrdAmount: '7700.00',
                },
                {
                    custCountry: 'Canada',
                    totalOrdAmount: '9500.00',
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "totalAmoutByCountry", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT, users_constants_1.UserRole.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all orders (paginated)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get an array with all customers',
        schema: {
            example: {
                items: [
                    {
                        ordNum: '200101',
                        ordAmount: '3000.00',
                        advanceAmount: '1000.00',
                        ordDate: '2008-07-15',
                        ordDescription: 'SOD',
                        agentCode: {
                            agentCode: 'A008',
                            agentName: 'Alford',
                            workingArea: 'New York',
                            commission: '0.12',
                            phoneNo: '044-25874365',
                            country: '',
                        },
                        custCode: {
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
                        },
                    },
                    {
                        ordNum: '200102',
                        ordAmount: '2000.00',
                        advanceAmount: '300.00',
                        ordDate: '2008-05-25',
                        ordDescription: 'SOD',
                        agentCode: {
                            agentCode: 'A012',
                            agentName: 'Lucida',
                            workingArea: 'San Jose',
                            commission: '0.12',
                            phoneNo: '044-52981425',
                            country: '',
                        },
                        custCode: {
                            custCode: 'C00012',
                            custName: 'Steven',
                            custCity: 'San Jose',
                            workingArea: 'San Jose',
                            custCountry: 'USA',
                            grade: 1,
                            openingAmt: '5000.00',
                            receiveAmt: '7000.00',
                            paymentAmt: '9000.00',
                            outstandingAmt: '3000.00',
                            phoneNo: 'KRFYGJK',
                        },
                    },
                ],
                meta: {
                    totalItems: 2,
                    itemCount: 2,
                    itemsPerPage: 10,
                    totalPages: 1,
                    currentPage: 1,
                },
                links: {
                    first: 'http://localhost:3000/orders?limit=10',
                    previous: '',
                    next: '',
                    last: 'http://localhost:3000/orders?limit=10',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':ordNum'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT, users_constants_1.UserRole.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Get an order by ordNum' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order data by ordNum',
        schema: {
            example: {
                ordNum: '200101',
                ordAmount: '3000.00',
                advanceAmount: '1000.00',
                ordDate: '2008-07-15',
                ordDescription: 'SOD',
                agentCode: {
                    agentCode: 'A008',
                    agentName: 'Alford',
                    workingArea: 'New York',
                    commission: '0.12',
                    phoneNo: '044-25874365',
                    country: '',
                },
                custCode: {
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
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Order not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('ordNum')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT, users_constants_1.UserRole.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order' }),
    (0, swagger_1.ApiBody)({ type: create_order_dto_1.CreateOrderDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order successfully created',
        schema: {
            example: {
                ordNum: '200101',
                ordAmount: '3000',
                advanceAmount: '1000',
                ordDate: '2022-03-27',
                ordDescription: 'SOD',
                custCode: 'C00001',
                agentCode: 'A001',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Order failed to be created due to wrong parameters format',
        schema: {
            example: {
                statusCode: 400,
                message: ['ordAmount must be a number string.'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':ordNum'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT, users_constants_1.UserRole.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing order' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order successfully updated',
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
        description: 'Order failed to be updated due to wrong parameters format',
        schema: {
            example: {
                statusCode: 400,
                message: ['ordAmount must be a number string.'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('ordNum')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':ordNum'),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT, users_constants_1.UserRole.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an existing order by its ordNum' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order successfully deleted',
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
        description: 'Order was not deleted because forein key constraint',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('ordNum')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "delete", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('/api/orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map