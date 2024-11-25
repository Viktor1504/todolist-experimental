import {EditableTypography} from '../../../../../../common/components/EditableTypography/EditableTypography';
import {
    DomainTodolist, RequestStatus,
    todolistsApi,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} from '../../../../api/todolistsApi';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Grid2 from "@mui/material/Grid2";
import {useAppDispatch} from "../../../../../../common/hooks";

export const TodolistTitle = ({todolist}: { todolist: DomainTodolist }) => {
    const {title, id, entityStatus} = todolist

    const dispatch = useAppDispatch();

    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
    const [removeTodolist] = useRemoveTodolistMutation()

    const updateTodolistHandler = (title: string) => {
        updateTodolistTitle({id, title})
    }

    const removeTodolistHandler = () => {
        updateQueryData('loading')
        removeTodolist(id)
            .unwrap()
            .catch(() => {
                updateQueryData('idle')
            })
    }

    const updateQueryData = (status: RequestStatus) => {
        dispatch(
            todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
                const index = state.findIndex(tl => tl.id === id)
                if (index !== -1) {
                    state[index].entityStatus = status
                }
            })
        )
    }

    return (
        <Grid2
            container
            alignItems="center"
        >
            <Grid2>
                <EditableTypography onChange={updateTodolistHandler} value={title}
                                    disabled={entityStatus === "loading"}/>
            </Grid2>
            <Grid2>
                <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                    <DeleteIcon/>
                </IconButton>
            </Grid2>
        </Grid2>
    )
}