import {DomainTask, useRemoveTaskMutation} from "../../../../../api/tasksApi";
import {Checkbox, ListItem} from "@mui/material";
import {TaskStatus} from "../../../../../../../common/enums";
import {EditableTypography} from "../../../../../../../common/components/EditableTypography/EditableTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {DomainTodolist} from "../../../../../api/todolistsApi";

type Props = {
    todolist: DomainTodolist
    task: DomainTask
}

export const Task = ({todolist, task}: Props) => {
    const [removeTask] = useRemoveTaskMutation()

    const removeTaskHandler = () => {
        removeTask({todolistId: todolist.id, taskId: task.id})
    }

    const updateTaskHandler = (title: string) => {
        // updateTaskTitle({id, title})
    }

    return (
        <ListItem>
            <Checkbox checked={task.status === TaskStatus.Completed}/>
            <EditableTypography value={task.title} onChange={updateTaskHandler}/>
            <IconButton onClick={removeTaskHandler} disabled={todolist.entityStatus === "loading"}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}