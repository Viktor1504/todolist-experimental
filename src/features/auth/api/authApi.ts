import {baseApi} from '../../../app/baseApi';
import {BaseResponse} from '../../../common/types/types';
import {LoginArgs} from './authApi.Types';

const authApi = baseApi.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
            query: (payload) => ({
                url: 'auth/login',
                method: 'POST',
                body: payload
            })
        }),
        me: build.query<BaseResponse<{ id: number, email: string, login: string }>, void>({
            query: () => 'auth/me'

        }),
        logout: build.mutation<BaseResponse, void>({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE',
            })
        })
    })
})

export const {useLoginMutation, useMeQuery, useLogoutMutation} = authApi