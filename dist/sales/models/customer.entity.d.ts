import { Agent } from './agent.entity';
export declare class Customer {
    custCode: string;
    custName: string;
    custCity: string;
    workingArea: string;
    custCountry: string;
    grade: number;
    openingAmt: number;
    receiveAmt: number;
    paymentAmt: number;
    outstandingAmt: number;
    phoneNo: string;
    agentCode: Agent;
}
