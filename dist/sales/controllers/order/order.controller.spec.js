"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const order_service_1 = require("../../services/order/order.service");
const order_controller_1 = require("./order.controller");
describe('OrderController', () => {
    let orderController;
    const mockOrderService = {
        findAll: jest.fn().mockImplementation(() => Promise.resolve({
            items: [
                {
                    ordNum: '200133',
                },
            ],
            meta: {
                totalItems: 1,
                itemCount: 1,
                itemsPerPage: 10,
                totalPages: 1,
                currentPage: 1,
            },
            links: {
                first: 'link',
                previous: '',
                next: '',
                last: 'link',
            },
        })),
        findOneById: jest
            .fn()
            .mockImplementationOnce(() => {
            throw new common_1.NotFoundException();
        })
            .mockImplementationOnce((ordNum) => Promise.resolve({
            ordNum: String(ordNum),
        })),
        create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
        update: jest
            .fn()
            .mockImplementation((ordNum, dto) => Promise.resolve(Object.assign({ ordNum: String(ordNum) }, dto))),
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
        totalAmountByCustomer: jest.fn().mockImplementation(() => Promise.resolve([
            {
                custCode: 'C00001',
                totalOrdAmount: '3000.00',
            },
        ])),
        totalAmountByAgent: jest.fn().mockImplementation(() => Promise.resolve([
            {
                agentCode: 'A001',
                totalOrdAmount: '800.00',
            },
        ])),
        totalAmountByCountry: jest.fn().mockImplementation(() => Promise.resolve([
            {
                custCountry: 'Australia',
                totalOrdAmount: '7700.00',
            },
        ])),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [order_controller_1.OrderController],
            providers: [order_service_1.OrderService],
        })
            .overrideProvider(order_service_1.OrderService)
            .useValue(mockOrderService)
            .compile();
        orderController = module.get(order_controller_1.OrderController);
    });
    it('should be defined', () => {
        expect(orderController).toBeDefined();
    });
    it('should find all orders paginated', async () => {
        const req = {};
        const result = await orderController.findAll(req, 1);
        expect(result).toEqual({
            items: [
                {
                    ordNum: '200133',
                },
            ],
            meta: {
                totalItems: 1,
                itemCount: 1,
                itemsPerPage: 10,
                totalPages: 1,
                currentPage: 1,
            },
            links: {
                first: 'link',
                previous: '',
                next: '',
                last: 'link',
            },
        });
    });
    it('should find an order by id', async () => {
        const ordNum = '200133';
        try {
            await orderController.findById(Number(ordNum));
        }
        catch (error) {
            expect(error).toEqual(new common_1.NotFoundException());
        }
        expect(await orderController.findById(Number(ordNum))).toEqual({
            ordNum,
        });
    });
    it('should create a new order', async () => {
        const newOrder = {};
        newOrder.ordNum = 200133;
        expect(await orderController.create(newOrder)).toEqual(newOrder);
    });
    it('should update an order', async () => {
        const ordNum = '200133';
        const updateOrder = {
            ordDescription: 'orderDescription',
        };
        expect(await orderController.update(Number(ordNum), updateOrder)).toEqual(Object.assign({ ordNum }, updateOrder));
    });
    it('should delete an order', async () => {
        const ordNum = '200133';
        expect(await orderController.delete(Number(ordNum))).toEqual({
            raw: [],
            affected: 0,
        });
        expect(await orderController.delete(Number(ordNum))).toEqual({
            raw: [],
            affected: 1,
        });
    });
    it('should return total amount by customer', async () => {
        expect(await orderController.totalAmoutByCustomer()).toEqual([
            {
                custCode: 'C00001',
                totalOrdAmount: '3000.00',
            },
        ]);
    });
    it('should return total amount by agent', async () => {
        expect(await orderController.totalAmoutByAgent()).toEqual([
            {
                agentCode: 'A001',
                totalOrdAmount: '800.00',
            },
        ]);
    });
    it('should return total amount by countryr', async () => {
        expect(await orderController.totalAmoutByCountry()).toEqual([
            {
                custCountry: 'Australia',
                totalOrdAmount: '7700.00',
            },
        ]);
    });
});
//# sourceMappingURL=order.controller.spec.js.map