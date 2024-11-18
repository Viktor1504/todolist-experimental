import {Outlet} from 'react-router-dom';
import {useAppDispatch} from '../common/hooks';
import {useMeQuery} from '../features/auth/api/authApi';
import {useEffect, useState} from 'react';
import {ResultCode} from '../common/enums';
import {setIsLoggedIn} from './appSlice';
import {Box, CircularProgress} from '@mui/material';
import {Header} from '../common/components/Header/Header';

function App() {
    const dispatch = useAppDispatch();
    const [isInitialized, setIsInitialized] = useState(false);
    const {data, isLoading} = useMeQuery();

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true);
            if (data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({isLoggedIn: true}));
            }
        }
    }, [isLoading, data, dispatch]);

    if (!isInitialized) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#f0f0f0'
                }}>
                <CircularProgress size={80} thickness={4}/>
            </Box>
        );
    }

    return <>
        <Header/>
        <Outlet/>
    </>

}

export default App;
