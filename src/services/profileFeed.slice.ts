import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Order} from "../types/order.ts";
import {WebsocketStatus} from "../enum/WebsocketStatus.enum.ts";

interface ProfileFeedState {
    status: WebsocketStatus;
    orders: Order[];
    connectionError: string | null;
    total: number | null;
    totalToday: number | null;
}

const initialState: ProfileFeedState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectionError: null,
    total: null,
    totalToday: null,
}

export interface WsProfileFeedResponse {
    success: boolean
    orders: Order[]
    total: number
    totalToday: number
}

export const wsProfileFeedConnect = createAction<string, "PROFILE_FEED_CONNECT">(
    "PROFILE_FEED_CONNECT"
);

export const wsProfileFeedDisconnect = createAction("PROFILE_FEED_DISCONNECT");

export const profileFeedSlice = createSlice({
    name: 'profileFeed',
    initialState,
    selectors: {
        getProfileFeedWebsocketStatus: (state: ProfileFeedState) => state.status,
        getProfileFeedOrders: (state: ProfileFeedState) => state.orders,
        getProfileFeedTotal: (state: ProfileFeedState) => state.total,
        getProfileFeedTotalToday: (state: ProfileFeedState) => state.totalToday,
    },
    reducers: {
        wsProfileFeedConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsProfileFeedOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = null;
        },
        wsProfileFeedClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsProfileFeedError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsProfileFeedMessage: (state, action: PayloadAction<WsProfileFeedResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
})

export const {
    wsProfileFeedConnecting,
    wsProfileFeedOpen,
    wsProfileFeedClose,
    wsProfileFeedError,
    wsProfileFeedMessage
} = profileFeedSlice.actions;
export const {
    getProfileFeedWebsocketStatus,
    getProfileFeedOrders,
    getProfileFeedTotal,
    getProfileFeedTotalToday
} = profileFeedSlice.selectors;

export default profileFeedSlice;
