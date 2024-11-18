import {createSlice} from '@reduxjs/toolkit';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoggedIn: false,
        status: 'idle' as RequestStatus,
        error: null as string | null,
    },
    reducers: create => ({
        setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
        setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        setAppError: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
    }),
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn,
        selectStatus: (state) => state.status,
        selectAppError: (state) => state.error
    }
})

export const {setIsLoggedIn, setAppStatus, setAppError} = appSlice.actions
export const {selectIsLoggedIn, selectStatus, selectAppError} = appSlice.selectors