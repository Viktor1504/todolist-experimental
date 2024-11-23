import {baseApi} from '../../../app/baseApi';
import {BaseResponse} from '../../../common/types/types';
import {BaseQueryArg} from '@reduxjs/toolkit/query';

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            transformResponse(todolists: Todolist[]): DomainTodolist[] {
                return todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
            },
            providesTags: ['Todolist'],
        }),
        addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
            query: (title) => {
                return {
                    url: 'todo-lists',
                    method: 'POST',
                    body: {
                        title
                    }
                }
            },
            invalidatesTags: ['Todolist']
        }),
        removeTodolist: build.mutation<BaseResponse, string>({
            query: (id) => {
                return {
                    url: `todo-lists/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Todolist']
        }),
        updateTodolistTitle: build.mutation<BaseResponse, { id: string, title: string }>({
            query: ({id, title}) => {
                return {
                    url: `todo-lists/${id}`,
                    method: 'PUT',
                    body: {
                        title
                    }
                }
            },
            invalidatesTags: ['Todolist']
        })
    })
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} = todolistsApi