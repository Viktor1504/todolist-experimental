import {baseApi} from '../../../app/baseApi';

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
    })
})

export const {useGetTodolistsQuery} = todolistsApi