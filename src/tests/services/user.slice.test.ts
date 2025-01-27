import userSlice, {initialState, setIsAuthChecked, setUser, UserState} from '../../services/user.slice.ts'
import {User} from "../../types/user.ts";
import {logout} from "../../services/user.thunk.ts";

describe('userSlice', () => {
    it('should return the initial state', () => {
        expect(userSlice.reducer(undefined, {type: 'unknown'})).toEqual(
            initialState
        )
    })

    it('should set auth checked', () => {
        expect(userSlice.reducer(initialState, setIsAuthChecked(true))).toEqual({
            ...initialState, isAuthChecked: true
        })
    })

    it('should set user', () => {
        const testUser: User = {
            email: 'test@example.com',
            name: 'Test Name',
        };

        expect(userSlice.reducer(initialState, setUser(testUser))).toEqual({
            ...initialState, user: testUser
        })
    })

    it('should handle logout.fulfilled', () => {
        const modifiedState: UserState = {
            ...initialState,
            user: {
                email: 'test@example.com',
                name: 'Test Name',
            },
        };

        const action = {type: logout.fulfilled.type};
        expect(userSlice.reducer(modifiedState, action)).toEqual({
            ...modifiedState,
            user: null,
        });
    });

    it('should handle logout.rejected', () => {
        const modifiedState: UserState = {
            ...initialState,
            user: {
                email: 'test@example.com',
                name: 'Test Name',
            },
        };

        const action = {type: logout.rejected.type};
        expect(userSlice.reducer(modifiedState, action)).toEqual({
            ...initialState,
            user: null,
        });
    });
}) 