import React, {useState} from 'react';
import {Box, Grid, Container, FormControl, TextField, Button, Divider, InputLabel, Select, OutlinedInput, MenuItem, Typography, FormHelperText} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';

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

function Instructor() {

    const {handleAddInstructor} = useOutletContext()

    const [newInstructors, setNewInstructors] = useState([])

    const instructorDisplay = newInstructors.map((instructor)=>{
        return(
        <Box key={instructor.id} sx={{backgroundColor: 'white'}}>
            <Typography>{instructor.name}, {instructor.email}, 
                {instructor.bio}, {instructor.instrument}, {instructor.experience}
            </Typography>
            <img src={instructor.photo} style={{height: '100px', width: '100px'}}></img>
        </Box>
        )
    })

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

    const createInstructorSchema = yup.object({
        name: yup
            .string('Enter your name')
            .min(3, 'Must be at least 3 characters')
            .max(30, 'Must be 30 characters or less')
            .required('Name is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        bio: yup
            .string('Enter your name')
            .min(10, 'Must be at least 10 characters')
            .max(250, 'Must be 250 characters or less')
            .required('Bio is required'),
        experience: yup
            .number('Enter your years of experience')
            .min(1, 'Must have at least one year of experience')
            .required('Enter your years of experience'), 
        instrument: yup
            .string('Select an instrument')
            .oneOf(VALID_INSTRUMENTS)
            .required('You must select a valid instrument'),
        photo: yup 
            .string()
    });

    const submitInstructor = async (values)=>{
        console.log(values)
        try {
            const res = await fetch('/api/instructors', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const instructorData = await res.json()
            if (!res.ok){
                console.log('Error: create instructor failed', instructorData.message)
                return
            }
            handleAddInstructor(instructorData)
            setNewInstructors([...newInstructors, instructorData])
        } catch (error) {
            console.error('Error', error.message)
            return error
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            bio: '',
            experience: '',
            instrument: '',
            photo: '',
        },
        validationSchema: createInstructorSchema,
        onSubmit: submitInstructor,
    })

    return (
        <Container className='container' sx={containerStyle}>
        <Box sx={boxStyle}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid item sx={{marginTop: '20px', marginBottom:'20px'}}>
                        <FormControl>
                            <TextField 
                                id='name'
                                name='name'
                                label="Enter Your Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
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
                                id='bio'
                                name='bio'
                                label="Enter Bio"
                                type='text'
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                error={formik.touched.bio && Boolean(formik.errors.bio)}
                                helperText={formik.touched.bio && formik.errors.bio}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl>
                            <TextField 
                                id='experience'
                                name='experience'
                                type='number'
                                label="Enter Your Experience"
                                value={formik.values.experience}
                                onChange={formik.handleChange}
                                error={formik.touched.experience && Boolean(formik.errors.experience)}
                                helperText={formik.touched.experience && formik.errors.experience}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl sx={{width:194}}>
                            <InputLabel>Instrument</InputLabel>
                            <Select
                                id='instrument'
                                name='instrument'
                                input={<OutlinedInput label="Instrument"/>}
                                value={formik.values.instrument}
                                onChange={formik.handleChange}
                                error={formik.touched.instrument && Boolean(formik.errors.instrument)}
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
                            <FormHelperText>{formik.touched.instrument && formik.errors.instrument}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl>
                            <TextField 
                                id='photo'
                                name='photo'
                                label="Enter Photo URL"
                                type='photo'
                                value={formik.values.photo}
                                onChange={formik.handleChange}
                                error={formik.touched.photo && Boolean(formik.errors.photo)}
                                helperText={formik.touched.photo && formik.errors.photo}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <Button type='submit' variant='contained' size='large' sx={{minWidth: '200px'}}>Add Instructor</Button>
                    </Grid>
                </Grid>
            </form>
            <Divider variant='middle' sx={{height: '4px', opacity: 1, marginBottom: '20px'}}/>
            {instructorDisplay}
        </Box>
        <Box sx={{backgroundColor: 'white'}}>
        </Box>
        </Container>
    );
}

export default Instructor;