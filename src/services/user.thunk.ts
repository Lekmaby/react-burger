import {createAsyncThunk} from "@reduxjs/toolkit";
import auth from "../utils/auth.ts";
import {setIsAuthChecked, setUser} from "./user.slice.ts";

export const checkUserAuth = createAsyncThunk(
    "user/checkUserAuth",
    async (_, {dispatch}) => {
        if (localStorage.getItem("accessToken")) {
            auth.getUser()
                .then(data => dispatch(setUser(data.user)))
                .finally(() => dispatch(setIsAuthChecked(true)));
        } else {
            dispatch(setIsAuthChecked(true));
        }
    }
)


export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        return auth.logout();
    }
);