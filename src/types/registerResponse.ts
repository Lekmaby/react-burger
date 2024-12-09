import {User} from "./user.ts";

export type RegisterResponse = {
    success: boolean,
    user: User,
    accessToken: string,
    refreshToken: string
    message?: string
};
