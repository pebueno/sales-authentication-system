"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const agent_entity_1 = require("../sales/models/agent.entity");
const customer_entity_1 = require("../sales/models/customer.entity");
const order_entity_1 = require("../sales/models/order.entity");
const agent_controller_1 = require("./controllers/agent/agent.controller");
const customer_controller_1 = require("./controllers/customer/customer.controller");
const order_controller_1 = require("./controllers/order/order.controller");
const agent_service_1 = require("./services/agent/agent.service");
const customer_service_1 = require("./services/customer/customer.service");
const order_service_1 = require("./services/order/order.service");
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([agent_entity_1.Agent, customer_entity_1.Customer, order_entity_1.Order])],
        controllers: [agent_controller_1.AgentController, customer_controller_1.CustomerController, order_controller_1.OrderController],
        providers: [agent_service_1.AgentService, customer_service_1.CustomerService, order_service_1.OrderService],
    })
], SalesModule);
//# sourceMappingURL=sales.module.js.map