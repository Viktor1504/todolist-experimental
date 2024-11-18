import React from 'react';
import Grid2 from '@mui/material/Grid2';
import {Button, FormControl, FormGroup, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import {LoginArgs} from '../api/authApi.Types';
import {useLoginMutation} from '../api/authApi';
import {ResultCode} from '../../../common/enums';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {selectIsLoggedIn, setAppStatus, setIsLoggedIn} from '../../../app/appSlice';
import {Navigate} from 'react-router-dom';

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const [login] = useLoginMutation()

    const formik = useFormik<LoginArgs>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            dispatch(setAppStatus({status: 'loading'}))
            try {
                const res = await login(values);
                if (res.data?.resultCode === ResultCode.Success) {
                    localStorage.setItem('sn-token', res.data.data.token);
                    dispatch(setIsLoggedIn({isLoggedIn: true}));
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    dispatch(setAppStatus({status: 'failed'}))
                }
            } catch (error: any) {
                dispatch(setAppStatus({status: 'failed'}))
            }
        },
        validate: values => {
            const errors: Partial<LoginArgs> = {}
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <= 3) {
                errors.password = 'Password must be more than 3 characters';
            }
            return errors;
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Grid2 container justifyContent="center" alignItems="center" sx={{minHeight: '100vh'}}>
            <Grid2>
                <FormControl>
                    <Typography variant="h5" component="h2" align="center" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup
                            sx={{gap: 2, p: 2, width: 270, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff'}}>
                            <TextField id="email"
                                       name="email"
                                       autoFocus
                                       value={formik.values.email}
                                       type="email"
                                       label="Email"
                                       variant="outlined"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.email && !!formik.errors.email}
                                       helperText={formik.touched.email && formik.errors.email}
                                       fullWidth/>

                            <TextField id="password"
                                       name="password"
                                       value={formik.values.password}
                                       type="password"
                                       label="Password"
                                       variant="outlined"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.password && !!formik.errors.password}
                                       helperText={formik.touched.password && formik.errors.password}
                                       fullWidth/>
                            <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}
                                    fullWidth>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid2>
        </Grid2>
    );
};
