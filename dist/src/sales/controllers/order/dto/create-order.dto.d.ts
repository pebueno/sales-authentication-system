import { Agent } from '../../../models/agent.entity';
import { Customer } from '../../../models/customer.entity';
export declare class CreateOrderDto {
    ordNum: number;
    ordAmount: number;
    advanceAmount: number;
    ordDate: Date;
    custCode: Customer;
    agentCode: Agent;
    ordDescription: string;
}
