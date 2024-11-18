import React from 'react';
import {Container} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import {Todolists} from '../features/todolists/Todolists';
import {useAppSelector} from '../common/hooks';
import {selectIsLoggedIn} from './appSlice';
import {Navigate} from 'react-router-dom';
import {Path} from '../common/router';

export const Main = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={Path.Login}/>
    }

    return (
        <Container fixed>
            <Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>
        </Container>
    )
}