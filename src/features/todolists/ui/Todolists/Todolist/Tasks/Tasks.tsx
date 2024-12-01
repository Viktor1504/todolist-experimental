import {DomainTask, useGetTasksQuery} from "../../../../api/tasksApi";
import {DomainTodolist} from "../../../../api/todolistsApi";
import {TaskStatus} from "../../../../../../common/enums";
import {List} from "@mui/material";
import {Task} from "./Task/Task";

export const Tasks = ({todolist}: { todolist: DomainTodolist }) => {
    const {data} = useGetTasksQuery(todolist.id);

    let tasksForTodolist = data?.items

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist?.filter((t: DomainTask) => t.status === TaskStatus.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist?.filter((t: DomainTask) => t.status === TaskStatus.Completed)
    }

    return (
        <>
            <List>
                {tasksForTodolist ? (
                    tasksForTodolist.map((task: DomainTask) => (
                        <Task key={task.id} task={task} todolist={todolist}/>
                    ))
                ) : (
                    <p>Тасок нет</p>
                )}
            </List>
        </>
    );
};
