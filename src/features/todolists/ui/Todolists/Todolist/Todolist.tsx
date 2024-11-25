import {DomainTodolist} from '../../../api/todolistsApi';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";

export const Todolist = ({todolist}: { todolist: DomainTodolist }) => {


    return (
        <>
            <TodolistTitle todolist={todolist}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </>
    )
}