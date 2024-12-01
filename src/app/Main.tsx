import React, {useCallback} from 'react';
import {Container} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import {Todolists} from '../features/todolists/ui/Todolists/Todolists';
import {useAppSelector} from '../common/hooks';
import {selectIsLoggedIn} from './appSlice';
import {Navigate} from 'react-router-dom';
import {Path} from '../common/router';
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {useAddTodolistMutation} from "../features/todolists/api/todolistsApi";

export const Main = () => {

    const [addTodolist] = useAddTodolistMutation()

    const addTodolistCallback = useCallback((title: string) => {
        addTodolist(title)
    }, [addTodolist])

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={Path.Login}/>
    }

    return (
        <Container fixed>
            <Grid2 container sx={{mb: "30px"}}>
                <AddItemForm addItem={addTodolistCallback}/>
            </Grid2>
            <Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>
        </Container>
    )
}