import {User} from "./user.ts";

export type UserResponse = {
    success: boolean,
    message?: string,
    user: User
};
