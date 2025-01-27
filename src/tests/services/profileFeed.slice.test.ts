import profileFeedSlice, {
    initialState,
    wsProfileFeedClose,
    wsProfileFeedConnecting,
    wsProfileFeedError,
    wsProfileFeedMessage,
    wsProfileFeedOpen,
    WsProfileFeedResponse,
} from '../../services/profileFeed.slice.ts';
import {WebsocketStatus} from "../../enum/WebsocketStatus.enum.ts";

describe('profileFeedSlice', () => {
    it('should return the initial state', () => {
        expect(profileFeedSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle wsProfileFeedConnecting', () => {
        expect(profileFeedSlice.reducer(initialState, wsProfileFeedConnecting())).toEqual({
            ...initialState, status: WebsocketStatus.CONNECTING
        })
    });

    it('should handle wsProfileFeedOpen', () => {
        expect(profileFeedSlice.reducer(initialState, wsProfileFeedOpen())).toEqual({
            ...initialState, status: WebsocketStatus.ONLINE, connectionError: null
        })
    });

    it('should handle wsProfileFeedClose', () => {
        expect(profileFeedSlice.reducer(initialState, wsProfileFeedClose())).toEqual({
            ...initialState, status: WebsocketStatus.OFFLINE
        })
    });

    it('should handle wsProfileFeedError', () => {
        const errorMessage = 'Connection failed';

        expect(profileFeedSlice.reducer(initialState, wsProfileFeedError(errorMessage))).toEqual({
            ...initialState, connectionError: errorMessage
        })
    });

    it('should handle wsProfileFeedMessage', () => {
        const response: WsProfileFeedResponse = {
            success: true,
            orders: [
                {_id: '1', number: 1, name: 'Order 1'},
                {_id: '2', number: 2, name: 'Order 2'},
            ],
            total: 100,
            totalToday: 10,
        };

        expect(profileFeedSlice.reducer(initialState, wsProfileFeedMessage(response))).toEqual({
            ...initialState, orders: response.orders, total: response.total, totalToday: response.totalToday
        })
    });
});