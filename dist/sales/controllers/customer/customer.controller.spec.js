"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const customer_service_1 = require("../../services/customer/customer.service");
const customer_controller_1 = require("./customer.controller");
describe('CustomerController', () => {
    let customerController;
    const mockCustomerService = {
        findAll: jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve([{ custCode: 'C00001' }]))
            .mockImplementationOnce(() => Promise.resolve([{ custCode: 'C00001' }, { custCode: 'C00002' }])),
        findOneById: jest
            .fn()
            .mockImplementationOnce(() => {
            throw new common_1.NotFoundException();
        })
            .mockImplementationOnce((custCode) => Promise.resolve({ custCode })),
        create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
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
            controllers: [customer_controller_1.CustomerController],
            providers: [customer_service_1.CustomerService],
        })
            .overrideProvider(customer_service_1.CustomerService)
            .useValue(mockCustomerService)
            .compile();
        customerController = module.get(customer_controller_1.CustomerController);
    });
    it('should be defined', () => {
        expect(customerController).toBeDefined();
    });
    it('should find all customers', async () => {
        let result = await customerController.findAll();
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
        result = await customerController.findAll();
        expect(result.length).toBe(1);
        expect(result).toEqual([{ custCode: 'C00001' }]);
        result = await customerController.findAll();
        expect(result.length).toBe(2);
        expect(result).toEqual([{ custCode: 'C00001' }, { custCode: 'C00002' }]);
    });
    it('should find a customer by id', async () => {
        const custCode = 'C00001';
        try {
            await customerController.findById(custCode);
        }
        catch (error) {
            expect(error).toEqual(new common_1.NotFoundException());
        }
        expect(await customerController.findById(custCode)).toEqual({ custCode });
    });
    it('should create a new customer', async () => {
        const newCustomer = {};
        newCustomer.custCode = 'C00001';
        expect(await customerController.create(newCustomer)).toEqual(newCustomer);
    });
    it('should update a customer', async () => {
        const custCode = 'C00001';
        const updateCustomer = {
            custName: 'custName',
        };
        expect(await customerController.update(custCode, updateCustomer)).toEqual(Object.assign({ custCode }, updateCustomer));
    });
    it('should delete a customer', async () => {
        const custCode = 'C00001';
        expect(await customerController.delete(custCode)).toEqual({
            raw: [],
            affected: 0,
        });
        expect(await customerController.delete(custCode)).toEqual({
            raw: [],
            affected: 1,
        });
    });
});
//# sourceMappingURL=customer.controller.spec.js.map