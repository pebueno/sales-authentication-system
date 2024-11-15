import { CreateAgentDto } from '../../controllers/agent/dto/create-agent.dto';
import { UpdateAgentDto } from '../../controllers/agent/dto/update-agent.dto';
import { Agent } from '../../models/agent.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
export declare class AgentService {
    private repository;
    constructor(repository: Repository<Agent>);
    findAll(): Promise<Agent[] | undefined>;
    findOneById(agentCode: any): Promise<Agent | undefined>;
    create(createAgentDto: CreateAgentDto): Promise<Agent>;
    update(agentCode: any, updateAgentDto: UpdateAgentDto): Promise<UpdateResult>;
    delete(agentCode: string): Promise<DeleteResult>;
}
