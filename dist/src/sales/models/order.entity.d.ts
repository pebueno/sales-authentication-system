import { Agent } from './agent.entity';
import { Customer } from './customer.entity';
export declare class Order {
    ordNum: number;
    ordAmount: number;
    advanceAmount: number;
    ordDate: Date;
    custCode: Customer;
    agentCode: Agent;
    ordDescription: string;
}
