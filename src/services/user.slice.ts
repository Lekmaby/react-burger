import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {User} from "../types/user.ts";
import {logout} from "./user.thunk.ts";

interface UserState {
    user: User | null;
    isAuthChecked: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthChecked: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        getIsAuthChecked: (state) => state.isAuthChecked,
        getUser: (state) => state.user,
    },
    reducers: {
        setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state) => {
                state.user = null;

                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            })
            .addCase(logout.rejected, (state) => {
                state.user = null;

                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            })

    }
})

export const {setIsAuthChecked, setUser} = userSlice.actions;
export const {getIsAuthChecked, getUser} = userSlice.selectors;

export default userSlice;
