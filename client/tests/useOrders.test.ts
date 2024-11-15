// import axios from 'axios';
// import { renderHook } from '@testing-library/react-hooks';
// import { useOrders } from '../src/hooks/useOrders';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('useOrders Hook', () => {
//   test('fetchOrders fetches data correctly', async () => {
//     const mockOrders = [{ ordNum: 1, ordAmount: 100 }];
//     mockedAxios.get.mockResolvedValueOnce({ data: { items: mockOrders } });

//     const { result } = renderHook(() => useOrders());
//     const fetchOrders = result.current.fetchOrders;
//     const orders = await fetchOrders();

//     expect(orders).toEqual(mockOrders);
//     expect(mockedAxios.get).toHaveBeenCalledWith('/orders');
//   });
// });
