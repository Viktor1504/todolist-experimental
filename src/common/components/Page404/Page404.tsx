import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {useNavigate} from 'react-router-dom'

export const Page404 = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
            }}
        >
            <ErrorOutlineIcon sx={{fontSize: 80, color: 'gray', mb: 2}}/>
            <Typography variant="h3" component="h1" gutterBottom>
                404: Page Not Found
            </Typography>
            <Typography variant="body1" sx={{mb: 4}}>
                Sorry, the page you're looking for doesn't exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
            >
                Go Home
            </Button>
        </Box>
    );
};