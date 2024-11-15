// import { render, screen } from '@testing-library/react';
// import OrderPage from '../src/pages/OrderPage';
// import { useOrders } from '../src/hooks/useOrders';
// import { useAgents } from '../src/hooks/useAgents';
// import { useCustomers } from '../src/hooks/useCustomers';

// jest.mock('../src/hooks/useOrders');
// jest.mock('../src/hooks/useAgents');
// jest.mock('../src/hooks/useCustomers');

// describe('OrderPage Component', () => {
//   beforeEach(() => {
//     (useOrders as jest.Mock).mockReturnValue({
//       fetchOrders: jest.fn().mockResolvedValue([{ ordNum: 1, ordAmount: 100 }]),
//       fetchTotalByCustomer: jest
//         .fn()
//         .mockResolvedValue([{ name: 'C001', value: 200 }]),
//       fetchTotalByAgent: jest
//         .fn()
//         .mockResolvedValue([{ name: 'A001', value: 300 }]),
//       fetchTotalByCountry: jest
//         .fn()
//         .mockResolvedValue([{ name: 'India', value: 400 }]),
//     });

//     (useAgents as jest.Mock).mockReturnValue({
//       fetchAgents: jest
//         .fn()
//         .mockResolvedValue([{ agentCode: 'A001', agentName: 'Agent1' }]),
//     });

//     (useCustomers as jest.Mock).mockReturnValue({
//       fetchCustomers: jest
//         .fn()
//         .mockResolvedValue([{ custCode: 'C001', custName: 'Customer1' }]),
//     });
//   });

//   test('renders OrderPage correctly', async () => {
//     render(<OrderPage />);

//     expect(await screen.findByText(/order management/i)).toBeInTheDocument();
//     expect(
//       await screen.findByText(/total orders by customer/i),
//     ).toBeInTheDocument();
//   });
// });
