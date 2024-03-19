import React from 'react';
import { Container, FormControl, Typography, Grid, TextField, Box , Button, Divider, getFormLabelUtilityClasses} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';



function Login() {

    const {login} = useAuth()
    // why does this need to be let rather than const
    let navigate = useNavigate();

    const handleCreateAccount = (e)=>{
        console.log('new account')
    }

    const containerStyle = {
        marginTop: '150px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }

    const boxStyle = {
        backgroundColor: '#E0E1DD',
        border: '1px solid grey', 
        borderRadius: '20px',
        paddingTop: '75px', 
        paddingBottom: '100px', 
        paddingRight: '50px', 
        paddingLeft: '50px'
    }

    const createAccountBtnStyle = {
        minWidth: '200px', 
        backgroundColor: 'green', 
        '&: hover': 
            {backgroundColor: 'darkgreen'}
    }

    const loginSchema = yup.object({
        email: yup
            .string('Enter you email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be a minimun of 8 characters')
            .required('Password is required')
    });

    const submitUser = async (values)=>{
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const userData = await res.json()
            if (!res.ok){
                console.log('uh oh - login failed', userData.message)
                return
            }
            console.log('login success', userData)
            login()
            navigate('/dashboard')
        } catch (error) {
            console.error('uh oh', error.message)
            return error
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: submitUser,
    })
    

    return (
        <Container className='container' sx={containerStyle}>
        <Box sx={boxStyle}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item sx={{marginTop: '20px', marginBottom:'20px'}}>
                        <FormControl>
                            <TextField 
                                id='email'
                                name='email'
                                label="Enter Your Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl>
                            <TextField 
                                id='password'
                                name='password'
                                label="Enter Your Password"
                                type='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <Button type='submit' variant='contained' size='large' sx={{minWidth: '200px'}}>Log In</Button>
                    </Grid>
                </Grid>
            </form>
            <Divider variant='middle' sx={{height: '4px', opacity: 1}}/>
            <Grid item sx={{marginTop: '10px'}}>
                <Typography variant='body2' sx={{marginBottom:'20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#13293d'}}>
                    Not yet enrolled? Sign up here
                </Typography>
            </Grid>
                <Grid item sx={{marginBottom:'20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant='contained' size='large' sx={createAccountBtnStyle} onClick={handleCreateAccount}>Create New Account</Button>
                </Grid>
        </Box>
        </Container>
    );
}

export default Login;