import { AgentService } from '../../services/agent/agent.service';
import { Agent } from '../../models/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
export declare class AgentController {
    private agentService;
    constructor(agentService: AgentService);
    findAll(): Promise<Agent[]>;
    findById(agentCode: string): Promise<Agent>;
    create(createAgentDto: CreateAgentDto): Promise<Agent>;
    update(agentCode: string, updateAgentDto: UpdateAgentDto): Promise<UpdateResult>;
    delete(agentCode: string): Promise<DeleteResult>;
}
