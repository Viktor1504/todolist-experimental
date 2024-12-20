import {createBrowserRouter} from 'react-router-dom';
import React from 'react';
import {Login} from '../../features/auth/ui/Login';
import App from '../../app/App';
import {Main} from '../../app/Main';
import {Page404} from '../components/Page404/Page404';

export const Path = {
    Login: 'login',
} as const;

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App/>,
            children: [
                {
                    path: '/',
                    element: <Main/>,
                },
                {
                    path: Path.Login,
                    element: <Login/>,
                },
                {
                    path: '*',
                    element: <Page404/>,
                },
            ],
        },
    ]
);
