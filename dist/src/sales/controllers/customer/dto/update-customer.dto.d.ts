import { Agent } from '../../../models/agent.entity';
export declare class UpdateCustomerDto {
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
