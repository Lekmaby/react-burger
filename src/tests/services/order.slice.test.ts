import orderSlice, {initialState, orderClosed, OrderState, setOrder} from '../../services/order.slice.ts';
import {Order} from '../../types/order.ts';

describe('orderSlice', () => {
    it('should return the initial state', () => {
        expect(orderSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle setOrder', () => {
        const testOrder: Order = {
            _id: '1',
            number: 1,
            name: 'Test Order',
        };

        expect(orderSlice.reducer(initialState, setOrder(testOrder))).toEqual({
            ...initialState, opened: true, order: testOrder
        })
    });

    it('should handle orderClosed', () => {
        const modifiedState: OrderState = {
            ...initialState,
            opened: true,
            order: {
                _id: '1',
                number: 1,
                name: 'Test Order',
            },
        };

        expect(orderSlice.reducer(modifiedState, orderClosed())).toEqual({
            ...modifiedState, opened: false, order: null
        })
    });

    it('should handle addOrder.matchFulfilled', () => {
        const testOrder: Order = {
            _id: '2',
            number: 2,
            name: 'Created Order 2',
        };

        const action = {
            type: 'orderApi/executeMutation/fulfilled',
            payload: testOrder,
            meta: {
                fulfilledTimeStamp: 1737644200004,
                RTK_autoBatch: true,
                arg: {
                    type: 'mutation',
                    endpointName: 'addOrder',
                    originalArgs: [
                        '643d69a5c3f7b9001cfa093d',
                        '643d69a5c3f7b9001cfa093e',
                        '643d69a5c3f7b9001cfa093d'
                    ],
                    track: true
                },
                requestId: 'VI-3Ktkna1DGHCkSqjVFK',
                requestStatus: 'fulfilled'
            }
        };

        expect(orderSlice.reducer(initialState, action)).toEqual({
            ...initialState, opened: true, order: testOrder
        })
    });

    it('should handle getOrder.matchFulfilled', () => {
        const testOrder: Order = {
            _id: '3',
            number: 3,
            name: 'Fetched Order 3',
        };

        const action = {
            type: 'orderApi/executeMutation/fulfilled',
            payload: testOrder,
            meta: {
                fulfilledTimeStamp: 1737644200004,
                baseQueryMeta: {
                    request: {},
                    response: {}
                },
                RTK_autoBatch: true,
                arg: {
                    type: 'mutation',
                    endpointName: 'getOrder',
                    originalArgs: '66569',
                    track: true
                },
                requestId: 'AFlvIdzWKQAs05xA1CLGH',
                requestStatus: 'fulfilled'
            }
        };

        expect(orderSlice.reducer(initialState, action)).toEqual({
            ...initialState, order: testOrder
        })
    });
});