import React from 'react';
import { Container, FormControl, Typography, Grid, TextField, Box , Button, Divider, getFormLabelUtilityClasses, InputLabel, Select, OutlinedInput, MenuItem} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const VALID_INSTRUMENTS = [
    'piano', 
    'drums', 
    'bass', 
    'guitar', 
    'trumpet',
    'trombone', 
    'tuba', 
    'french horn', 
    'cello', 
    'violin', 
    'viola', 
    'voice'
]

function Signup() {
    const {login} = useAuth()
    // why does this need to be let rather than const
    let navigate = useNavigate();

    const handleLogin = (e)=>{
        navigate('/login')
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
        paddingLeft: '50px',
        minWidth: '400px'
    }

    const loginBtnStyle = {
        minWidth: '200px', 
        backgroundColor: 'green', 
        '&: hover': 
            {backgroundColor: 'darkgreen'}
    }

    const signupSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        username: yup
            .string('Enter your name')
            .min(3, 'Must be at least 3 characters')
            .max(30, 'Must be 30 characters or less'),
        age: yup
            .number('Enter your age')
            .min(3, 'You must be older than 3 to enroll'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be a minimun of 8 characters')
            .required('Password is required'),
        primary_instrument: yup
            .string('Select an instrument')
            .required('You must select a valid instrument'),
    });

    const submitUser = async (values)=>{
        console.log(values)
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const userData = await res.json()
            if (!res.ok){
                console.log('uh oh - signup failed', userData.message)
                return
            }
            console.log('signup success', userData)
            login(userData)
            navigate('/dashboard')
        } catch (error) {
            console.error('uh oh', error.message)
            return error
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            primary_instrument: '',
            age: '',
        },
        validationSchema: signupSchema,
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
                                id='username'
                                name='username'
                                label="Enter Your Full Name"
                                type='text'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl>
                            <TextField 
                                id='age'
                                name='age'
                                type='number'
                                label="Enter Your Current Age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                error={formik.touched.age && Boolean(formik.errors.age)}
                                helperText={formik.touched.age && formik.errors.age}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl sx={{width:194}}>
                            <InputLabel>Primary Instrument</InputLabel>
                            <Select
                                id='instrument_select'
                                name='primary_instrument'
                                input={<OutlinedInput label="Primary Instrument"/>}
                                value={formik.values.primary_instrument}
                                onChange={formik.handleChange}
                            >
                                {VALID_INSTRUMENTS.map((instrument)=>{
                                    return (<MenuItem
                                        key={instrument}
                                        value={instrument}
                                    >
                                        {instrument}
                                    </MenuItem>)
                                })}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl>
                            <TextField 
                                id='password'
                                name='password'
                                label="Create Your Password"
                                type='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <Button type='submit' variant='contained' size='large' sx={{minWidth: '200px'}}>Create Account</Button>
                    </Grid>
                </Grid>
            </form>
            <Divider variant='middle' sx={{height: '4px', opacity: 1}}/>
            <Grid item sx={{marginTop: '10px'}}>
                <Typography variant='body2' sx={{marginBottom:'20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#13293d'}}>
                    Already enrolled? Log in here
                </Typography>
            </Grid>
                <Grid item sx={{marginBottom:'20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant='contained' size='large' sx={loginBtnStyle} onClick={handleLogin}>Login</Button>
                </Grid>
        </Box>
        </Container>
    );
}


export default Signup;