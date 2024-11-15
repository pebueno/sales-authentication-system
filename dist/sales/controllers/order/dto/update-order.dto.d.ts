import { Agent } from '../../../models/agent.entity';
import { Customer } from '../../../models/customer.entity';
export declare class UpdateOrderDto {
    ordAmount: number;
    advanceAmount: number;
    ordDate: Date;
    custCode: Customer;
    agentCode: Agent;
    ordDescription: string;
}
