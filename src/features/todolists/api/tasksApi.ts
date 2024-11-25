import {baseApi} from '../../../app/baseApi';
import {TaskPriority, TaskStatus} from "../../../common/enums";

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}



export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, string>({
            query: (todolistId) => `todo-lists/${todolistId}/tasks`,
            providesTags: ['Task'],
        }),

    })
})

export const {useGetTasksQuery} = tasksApi