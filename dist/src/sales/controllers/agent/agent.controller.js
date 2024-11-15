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
exports.AgentController = void 0;
const common_1 = require("@nestjs/common");
const agent_service_1 = require("../../services/agent/agent.service");
const create_agent_dto_1 = require("./dto/create-agent.dto");
const update_agent_dto_1 = require("./dto/update-agent.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const users_constants_1 = require("../../../constants/users.constants");
const auth_constants_1 = require("../../../constants/auth.constants");
let AgentController = class AgentController {
    constructor(agentService) {
        this.agentService = agentService;
    }
    async findAll() {
        return this.agentService.findAll();
    }
    async findById(agentCode) {
        const data = await this.agentService.findOneById(agentCode);
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return data;
    }
    async create(createAgentDto) {
        return this.agentService.create(createAgentDto);
    }
    async update(agentCode, updateAgentDto) {
        return this.agentService.update(agentCode, updateAgentDto);
    }
    async delete(agentCode) {
        return this.agentService.delete(agentCode);
    }
};
exports.AgentController = AgentController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all agents' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get an array with all agents',
        schema: {
            example: [
                {
                    agentCode: 'A001',
                    agentName: 'Jhon Smith',
                    workingArea: 'London',
                    commission: '0.10',
                    phoneNo: '077-12345674',
                    country: 'USA',
                },
                {
                    agentCode: 'A002',
                    agentName: 'Mukesh',
                    workingArea: 'Mumbai',
                    commission: '0.11',
                    phoneNo: '029-12358964',
                    country: '',
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':agentCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Get agent by agentCode with its customers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Agent data get by agentCode',
        schema: {
            example: {
                agentCode: 'A001',
                agentName: 'Jhon Smith',
                workingArea: 'London',
                commission: '0.10',
                phoneNo: '077-12345674',
                country: 'USA',
                customers: [
                    {
                        custCode: 'C00001',
                        custName: 'Charles',
                        custCity: 'New York',
                        workingArea: 'New York',
                        custCountry: 'USA',
                        grade: 2,
                        openingAmt: '3000.00',
                        receiveAmt: '5000.00',
                        paymentAmt: '2000.00',
                        outstandingAmt: '6000.00',
                        phoneNo: '077-12345674',
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Agent not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('agentCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new agent' }),
    (0, swagger_1.ApiBody)({ type: create_agent_dto_1.CreateAgentDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Agent successfully created',
        schema: {
            example: {
                agentCode: 'A001',
                agentName: 'Jhon Smith',
                workingArea: 'London',
                commission: '0.10',
                phoneNo: '077-12345674',
                country: 'USA',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Agent failed to be created due to wrong parameters format',
        schema: {
            example: {
                statusCode: 400,
                message: ['commission is not a valid decimal number.'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agent_dto_1.CreateAgentDto]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':agentCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing agents' }),
    (0, swagger_1.ApiBody)({ type: update_agent_dto_1.UpdateAgentDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Agent successfully updated',
        schema: {
            example: {
                generatedMaps: [],
                raw: [],
                affected: 1,
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('agentCode')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agent_dto_1.UpdateAgentDto]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':agentCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an existing agents by its agentCode' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Agent successfully deleted',
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
        description: 'Agent was not deleted because forein key constraint',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    }),
    (0, swagger_1.ApiResponse)(auth_constants_1.AuthForbiddenErrorSwagger),
    __param(0, (0, common_1.Param)('agentCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "delete", null);
exports.AgentController = AgentController = __decorate([
    (0, swagger_1.ApiTags)('Agents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(users_constants_1.UserRole.ADMIN, users_constants_1.UserRole.AGENT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('/api/agents'),
    __metadata("design:paramtypes", [agent_service_1.AgentService])
], AgentController);
//# sourceMappingURL=agent.controller.js.map