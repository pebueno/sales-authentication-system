"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const agent_service_1 = require("../../services/agent/agent.service");
const agent_controller_1 = require("./agent.controller");
describe('AgentController', () => {
    let agentController;
    const mockAgentService = {
        findAll: jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve([{ agentCode: 'A001' }]))
            .mockImplementationOnce(() => Promise.resolve([{ agentCode: 'A001' }, { agentCode: 'A002' }])),
        findOneById: jest
            .fn()
            .mockImplementationOnce(() => {
            throw new common_1.NotFoundException();
        })
            .mockImplementationOnce((agentCode) => Promise.resolve({ agentCode })),
        create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
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
            controllers: [agent_controller_1.AgentController],
            providers: [agent_service_1.AgentService],
        })
            .overrideProvider(agent_service_1.AgentService)
            .useValue(mockAgentService)
            .compile();
        agentController = module.get(agent_controller_1.AgentController);
    });
    it('should be defined', () => {
        expect(agentController).toBeDefined();
    });
    it('should find all agents', async () => {
        let result = await agentController.findAll();
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
        result = await agentController.findAll();
        expect(result.length).toBe(1);
        expect(result).toEqual([{ agentCode: 'A001' }]);
        result = await agentController.findAll();
        expect(result.length).toBe(2);
        expect(result).toEqual([{ agentCode: 'A001' }, { agentCode: 'A002' }]);
    });
    it('should find an agent by id', async () => {
        const agentCode = 'A001';
        try {
            await agentController.findById(agentCode);
        }
        catch (error) {
            expect(error).toEqual(new common_1.NotFoundException());
        }
        expect(await agentController.findById(agentCode)).toEqual({ agentCode });
    });
    it('should create a new agent', async () => {
        const newAgent = {};
        newAgent.agentCode = 'A001';
        expect(await agentController.create(newAgent)).toEqual(newAgent);
    });
    it('should update an agent', async () => {
        const agentCode = 'A001';
        const updateAgent = {
            agentName: 'agentName',
        };
        expect(await agentController.update(agentCode, updateAgent)).toEqual(Object.assign({ agentCode }, updateAgent));
    });
    it('should delete an agent', async () => {
        const agentCode = 'A001';
        expect(await agentController.delete(agentCode)).toEqual({
            raw: [],
            affected: 0,
        });
        expect(await agentController.delete(agentCode)).toEqual({
            raw: [],
            affected: 1,
        });
    });
});
//# sourceMappingURL=agent.controller.spec.js.map