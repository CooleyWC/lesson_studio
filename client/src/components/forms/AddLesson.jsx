import React, {useState} from 'react';
import {Paper, Box, FormControl, Select, InputLabel, MenuItem, Button, OutlinedInput, getFormLabelUtilityClasses} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import {useFormik, Form} from 'formik';
import * as yup from 'yup';
// import { FORMAT_SECONDS_NO_LEADING_ZEROS } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';


function AddLesson({allInstructors, user, handleScheduleLesson}) {

    const instructorIDs = allInstructors.map(instructor=>instructor.id)

    const submitLesson = (values)=>{
        
        const lessonObj = {
            user_rating: false,
            user_id: user.id,
            date_time: values.time.$d,
            instructor_id: values.instructor_id
        }

        console.log(lessonObj)
        handleScheduleLesson(lessonObj)
    }

    const lessonSchema = yup.object().shape({
        date: yup
            .date()
            .nullable(),
        time: yup
            .date()
            .nullable(),
        instructor_id: yup
            .number()
            .oneOf(instructorIDs)
            .required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            user_rating: false,
            user_id: user.id,
            date: null,
            time: null,
            instructor_id: "",
   
        },
        validationSchema: lessonSchema,
        onSubmit: submitLesson,
    })

    return (
        <Paper sx={{backgroundColor: 'white', height: '80px', paddingTop: '15px', paddingBottom: '15px', width: '100%'}}>
            <form onSubmit={formik.handleSubmit}>
            <Box sx={{paddingTop: '20px', paddingLeft: '15px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl>
                    <DatePicker 
                        label='Select Date'
                        value={formik.values.date}
                        onChange={value=>formik.setFieldValue("date", value)}
                        sx={{paddingRight: '10px'}}
                    />
                </FormControl>
                <FormControl>
                    <TimePicker
                        label='Select Time'
                        value={formik.values.time}
                        onChange={value=>formik.setFieldValue("time", value)}
                        referenceDate={dayjs(formik.values.date)}
                        sx={{paddingRight: '10px'}}
                    />
                </FormControl>
            </LocalizationProvider>
            <Box>
            <FormControl>
                <InputLabel>Select an Instructor</InputLabel>
                <Select 
                    label='Search By Instrument'
                    onChange={formik.handleChange}
                    value={formik.values.instructor_id}
                    name="instructor_id"
                    sx={{width: '200px'}}
                    >
                    {allInstructors.map((instructor)=>{
                        return(
                            <MenuItem
                                key={instructor.id}
                                value={instructor.id}
                                name={instructor.name}
                            >
                                {instructor.name}
                            </MenuItem>
                        )
                    })}
                </Select>
                </FormControl>
            </Box>
                <Box sx={{paddingLeft: '50px'}}>
                    <Button type='submit' variant='contained' sx={{paddingTop: '15px', paddingBottom: '15px'}}>Schedule Lesson</Button>
                </Box>
            </Box>
            </form>
        </Paper>
    );
}

export default AddLesson;