import {DomainTodolist} from '../../../api/todolistsApi';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';

export const Todolist = ({todolist}: { todolist: DomainTodolist }) => {


    return (
        <TodolistTitle todolist={todolist}/>
    )
}