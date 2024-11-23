import React from 'react';
import {useGetTodolistsQuery} from '../../api/todolistsApi';
import {Paper} from '@mui/material';
import {Todolist} from './Todolist/Todolist';
import Grid2 from '@mui/material/Grid2';

export const Todolists = () => {

    const {data: todolists} = useGetTodolistsQuery()

    return (
        <>
            {
                todolists?.map(tl => {
                    return (
                        <Grid2 key={tl.id}>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <Todolist todolist={tl}/>
                            </Paper>
                        </Grid2>
                    )
                })
            }
        </>
    )
}