import {EditableTypography} from '../../../../../../common/components/EditableTypography/EditableTypography';
import {DomainTodolist, useUpdateTodolistTitleMutation} from '../../../../api/todolistsApi';

export const TodolistTitle = ({todolist}: { todolist: DomainTodolist }) => {
    const {title, id, entityStatus} = todolist

    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

    const updateTodolistHandler = (title: string) => {
        updateTodolistTitle({id, title})
    }

    return (
        <EditableTypography onChange={updateTodolistHandler} value={title}/>
    )
}