import feedSlice, {
    initialState,
    wsClose,
    wsConnecting,
    wsError,
    WsFeedResponse,
    wsMessage,
    wsOpen
} from '../../services/feed.slice';
import {WebsocketStatus} from '../../enum/WebsocketStatus.enum';

describe('feedSlice', () => {
    it('should handle initial state', () => {
        expect(feedSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle wsConnecting', () => {
        expect(feedSlice.reducer(initialState, wsConnecting())).toEqual({
            ...initialState, status: WebsocketStatus.CONNECTING
        })
    });

    it('should handle wsOpen', () => {
        expect(feedSlice.reducer(initialState, wsOpen())).toEqual({
            ...initialState, status: WebsocketStatus.ONLINE, connectionError: null
        })
    });

    it('should handle wsClose', () => {
        expect(feedSlice.reducer(initialState, wsClose())).toEqual({
            ...initialState, status: WebsocketStatus.OFFLINE
        })
    });

    it('should handle wsError', () => {
        const errorMessage = 'Connection failed';
        expect(feedSlice.reducer(initialState, wsError(errorMessage))).toEqual({
            ...initialState, connectionError: errorMessage
        })
    });

    it('should handle wsMessage', () => {
        const payload: WsFeedResponse = {
            success: true,
            orders: [
                {_id: '1', number: 1, name: 'Order 1'},
                {_id: '2', number: 2, name: 'Order 2'},
            ],
            total: 1000,
            totalToday: 50,
        };

        expect(feedSlice.reducer(initialState, wsMessage(payload))).toEqual({
            ...initialState, orders: payload.orders, total: payload.total, totalToday: payload.totalToday
        })
    });
});