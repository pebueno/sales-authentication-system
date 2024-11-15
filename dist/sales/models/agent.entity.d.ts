import { Customer } from './customer.entity';
export declare class Agent {
    agentCode: string;
    agentName: string;
    workingArea: string;
    commission: number;
    phoneNo: string;
    country: string;
    customers: Customer[];
}
