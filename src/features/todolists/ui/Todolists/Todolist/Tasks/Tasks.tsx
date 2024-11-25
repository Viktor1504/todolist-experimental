import {DomainTask, useGetTasksQuery} from "../../../../api/tasksApi";
import {DomainTodolist} from "../../../../api/todolistsApi";
import {TaskStatus} from "../../../../../../common/enums";

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
            <ul>
                {tasksForTodolist ? (
                    tasksForTodolist.map((task: DomainTask) => (
                        <li key={task.id}>{task.title}</li>
                    ))
                ) : (
                    <li>Нет тасок</li>
                )}
            </ul>
        </>
    );
};
