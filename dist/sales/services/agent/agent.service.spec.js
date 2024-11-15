"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const agent_entity_1 = require("../../models/agent.entity");
const agent_service_1 = require("./agent.service");
describe('AgentService', () => {
    let agentService;
    const mockAgentRepository = {
        find: jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve([{ agentCode: 'A001' }]))
            .mockImplementationOnce(() => Promise.resolve([{ agentCode: 'A001' }, { agentCode: 'A002' }])),
        findOne: jest
            .fn()
            .mockImplementationOnce(() => {
            throw new common_1.NotFoundException();
        })
            .mockImplementationOnce((agentCode) => Promise.resolve({ agentCode })),
        create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
        save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
        update: jest
            .fn()
            .mockImplementation((agentCode, dto) => Promise.resolve(Object.assign({ agentCode }, dto))),
        delete: jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve({
            raw: [],
            affected: 0,
        }))
            .mockImplementationOnce(() => Promise.resolve({
            raw: [],
            affected: 1,
        })),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                agent_service_1.AgentService,
                { provide: (0, typeorm_1.getRepositoryToken)(agent_entity_1.Agent), useValue: mockAgentRepository },
            ],
        }).compile();
        agentService = module.get(agent_service_1.AgentService);
    });
    it('should be defined', () => {
        expect(agentService).toBeDefined();
    });
    it('should find all agents', async () => {
        let result = await agentService.findAll();
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
        result = await agentService.findAll();
        expect(result.length).toBe(1);
        expect(result).toEqual([{ agentCode: 'A001' }]);
        result = await agentService.findAll();
        expect(result.length).toBe(2);
        expect(result).toEqual([{ agentCode: 'A001' }, { agentCode: 'A002' }]);
    });
    it('should find an agent by id', async () => {
        const agentCode = 'A001';
        try {
            await agentService.findOneById(agentCode);
        }
        catch (error) {
            expect(error).toEqual(new common_1.NotFoundException());
        }
    });
    it('should create a new agent', async () => {
        const newAgent = {};
        newAgent.agentCode = 'A001';
        expect(await agentService.create(newAgent)).toEqual(newAgent);
    });
    it('should update an agent', async () => {
        const agentCode = 'A001';
        const updateAgent = {
            agentName: 'agentName',
        };
        expect(await agentService.update(agentCode, updateAgent)).toEqual(Object.assign({ agentCode }, updateAgent));
    });
    it('should delete an agent', async () => {
        const agentCode = 'A001';
        expect(await agentService.delete(agentCode)).toEqual({
            raw: [],
            affected: 0,
        });
        expect(await agentService.delete(agentCode)).toEqual({
            raw: [],
            affected: 1,
        });
    });
});
//# sourceMappingURL=agent.service.spec.js.map