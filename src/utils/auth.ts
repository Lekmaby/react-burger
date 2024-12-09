import api from "./api.ts";
import {DefaultResponse} from "../types/defaultResponse.ts";
import {RegisterResponse} from "../types/registerResponse.ts";
import {TokenResponse} from "../types/tokenResponse.ts";
import {UserResponse} from "../types/userResponse.ts";
import {User} from "../types/user.ts";

const auth = {
    passwordReset: (email: string): Promise<DefaultResponse> => {
        return api.post('/password-reset', {email});
    },
    passwordResetReset: (password: string, token: string): Promise<DefaultResponse> => {
        return api.post('/password-reset/reset', {password, token});
    },
    register: (email: string, password: string, name: string): Promise<RegisterResponse> => {
        return api.post('/auth/register', {email, password, name});
    },
    login: (email: string, password: string): Promise<RegisterResponse> => {
        return api.post('/auth/login', {email, password});
    },
    logout: (): Promise<DefaultResponse> => {
        const refreshToken = localStorage.getItem('refreshToken');
        return api.post('/auth/logout', {token: refreshToken});
    },
    token: (): Promise<TokenResponse> => {
        const refreshToken = localStorage.getItem('refreshToken');
        return api.post('/auth/token', {token: refreshToken});
    },
    getUser: (): Promise<UserResponse> => {
        return api.get('/auth/user');
    },
    updateUser: (data: User): Promise<UserResponse> => {
        return api.patch('/auth/user', {...data});
    },
};

export default auth;
