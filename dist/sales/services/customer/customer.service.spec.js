"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("../../models/customer.entity");
const customer_service_1 = require("./customer.service");
describe('CustomerService', () => {
    let customerService;
    const mockCustomerRepository = {
        find: jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve([{ custCode: 'C00001' }]))
            .mockImplementationOnce(() => Promise.resolve([{ custCode: 'C00001' }, { custCode: 'C00002' }])),
        findOne: jest
            .fn()
            .mockImplementationOnce(() => {
            throw new common_1.NotFoundException();
        })
            .mockImplementationOnce((custCode) => Promise.resolve({ custCode })),
        create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
        save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
        update: jest
            .fn()
            .mockImplementation((custCode, dto) => Promise.resolve(Object.assign({ custCode }, dto))),
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
                customer_service_1.CustomerService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(customer_entity_1.Customer),
                    useValue: mockCustomerRepository,
                },
            ],
        }).compile();
        customerService = module.get(customer_service_1.CustomerService);
    });
    it('should be defined', () => {
        expect(customerService).toBeDefined();
    });
    it('should find all customers', async () => {
        let result = await customerService.findAll();
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
        result = await customerService.findAll();
        expect(result.length).toBe(1);
        expect(result).toEqual([{ custCode: 'C00001' }]);
        result = await customerService.findAll();
        expect(result.length).toBe(2);
        expect(result).toEqual([{ custCode: 'C00001' }, { custCode: 'C00002' }]);
    });
    it('should find a customer by id', async () => {
        const custCode = 'C00001';
        try {
            await customerService.findOneById(custCode);
        }
        catch (error) {
            expect(error).toEqual(new common_1.NotFoundException());
        }
    });
    it('should create a new customer', async () => {
        const newCustomer = {};
        newCustomer.custCode = 'C00001';
        expect(await customerService.create(newCustomer)).toEqual(newCustomer);
    });
    it('should update a customer', async () => {
        const custCode = 'C00001';
        const updateCustomer = {
            custName: 'custName',
        };
        expect(await customerService.update(custCode, updateCustomer)).toEqual(Object.assign({ custCode }, updateCustomer));
    });
    it('should delete a customer', async () => {
        const custCode = 'C00001';
        expect(await customerService.delete(custCode)).toEqual({
            raw: [],
            affected: 0,
        });
        expect(await customerService.delete(custCode)).toEqual({
            raw: [],
            affected: 1,
        });
    });
});
//# sourceMappingURL=customer.service.spec.js.map