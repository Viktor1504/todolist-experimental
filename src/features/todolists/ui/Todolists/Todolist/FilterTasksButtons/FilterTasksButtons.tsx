import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {DomainTodolist, FilterValuesType, todolistsApi} from "../../../../api/todolistsApi";
import {useAppDispatch} from "../../../../../../common/hooks";

export const FilterTasksButtons = ({todolist}: { todolist: DomainTodolist }) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch();

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(
            todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
                const index = state.findIndex(tl => tl.id === id)
                if (index !== -1) {
                    state[index].filter = filter
                }
            })
        )
    }

    return (
        <Stack direction="row" spacing={1}>
            <Button
                variant={filter === "all" ? "contained" : "text"}
                onClick={() => changeFilterTasksHandler("all")}
                color={"inherit"}>
                All
            </Button>
            <Button
                variant={filter === "active" ? "contained" : "text"}
                onClick={() => changeFilterTasksHandler("active")}
                color={"primary"}>
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "contained" : "text"}
                onClick={() => changeFilterTasksHandler("completed")}
                color={"secondary"}>
                Completed
            </Button>
        </Stack>
    )
}