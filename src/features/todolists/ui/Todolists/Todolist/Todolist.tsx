import {DomainTodolist} from '../../../api/todolistsApi';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {useAddTaskMutation} from "../../../api/tasksApi";

export const Todolist = ({todolist}: { todolist: DomainTodolist }) => {

    const [addTask] = useAddTaskMutation()

    const addTaskCallback = (title: string) => {
        addTask({todolistId: todolist.id, title})
    }

    return (
        <>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </>
    )
}