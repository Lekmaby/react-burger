import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {User} from "../types/user.ts";
import {logout} from "./user.thunk.ts";

export interface UserState {
    user: User | null;
    isAuthChecked: boolean;
}

export const initialState: UserState = {
    user: null,
    isAuthChecked: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        getIsAuthChecked: (state: UserState) => state.isAuthChecked,
        getUser: (state: UserState) => state.user,
    },
    reducers: {
        setIsAuthChecked: (state: UserState, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state: UserState, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state: UserState) => {
                state.user = null;

                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            })
            .addCase(logout.rejected, (state: UserState) => {
                state.user = null;

                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            })

    }
})

export const {setIsAuthChecked, setUser} = userSlice.actions;
export const {getIsAuthChecked, getUser} = userSlice.selectors;

export default userSlice;
