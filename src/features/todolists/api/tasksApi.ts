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
    todolistId: string
    order: number
    addedDate: string
}

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, string>({
            query: (todolistId) => `todo-lists/${todolistId}/tasks`,
            providesTags: ['Task'],
        }),
        addTask: build.mutation<GetTasksResponse, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => {
                return {
                    url: `/todo-lists/${todolistId}/tasks`,
                    method: 'POST',
                    body: {
                        title
                    }
                }
            },
            invalidatesTags: ['Task']
        }),
        removeTask: build.mutation<GetTasksResponse, { todolistId: string, taskId: string }>({
            query: ({todolistId, taskId}) => {
                return {
                    url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Task']
        })
    })
})

export const {useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation} = tasksApi