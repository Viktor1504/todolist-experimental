import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useLogoutMutation} from '../../../features/auth/api/authApi';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectIsLoggedIn, selectStatus, setIsLoggedIn} from '../../../app/appSlice';
import {ResultCode} from '../../enums';
import {baseApi} from '../../../app/baseApi';
import {LinearProgress} from '@mui/material';

export const Header = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const appStatus = useAppSelector(selectStatus)
    const [logout] = useLogoutMutation()

    const logoutHandler = async () => {
        if (isLoggedIn) {
            try {
                const res = await logout()
                if (res.data?.resultCode === ResultCode.Success) {
                    dispatch(setIsLoggedIn({isLoggedIn: false}));
                    localStorage.removeItem('sn-token');
                    dispatch(baseApi.util.invalidateTags(['Task', 'Todolist']));
                }
            } catch (error) {
                console.error('An error occurred during logout: ', error);
            }
        }
    };


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Button onClick={logoutHandler} color="inherit">Logout</Button>
            </Toolbar>
            {appStatus === 'loading' && <LinearProgress/>}
        </AppBar>
    );
}
