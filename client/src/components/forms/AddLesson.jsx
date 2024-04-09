import React, {useState} from 'react';
import {Paper, Box, FormControl, Select, InputLabel, MenuItem, Button} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';



function AddLesson({allInstructors, user, handleScheduleLesson}) {

    const [dateValue, setDateValue] = useState(null)
    const [timeValue, setTimeValue] = useState(null)
    const [instructorSelect, setInstructorSelect] = useState('')

    const handleInstructorSelect = (e)=>{
        setInstructorSelect(e.target.value)
    }

    // need to add formik to this form
    const handleLessonSubmit = (e)=>{
        e.preventDefault()

        const matchingInstructor = allInstructors.find((instructor)=>{
            if(instructor.name === instructorSelect){
                return true
            }
        })
        const instructor_id = matchingInstructor.id

        const lessonObj = {
            "user_rating": false,
            "user_id": user.id,
            "instructor_id": instructor_id,
            "date_time": timeValue.$d
        }
        handleScheduleLesson(lessonObj) 
    }

    return (
        <Paper sx={{backgroundColor: 'white', height: '80px', paddingTop: '15px', paddingBottom: '15px', width: '100%'}}>
            <form onSubmit={handleLessonSubmit}>
            <Box sx={{paddingTop: '20px', paddingLeft: '15px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label='Select Date'
                    // format="YYYY/MM/DD"
                    value={dateValue}
                    onChange={newValue=>setDateValue(newValue)}
                    sx={{paddingRight: '10px'}}
                />
                <TimePicker
                    label='Select Time'
                    value={timeValue}
                    // format="YYYY/MM/DD/HH/mm/ss"
                    onChange={newValue=>setTimeValue(newValue)}
                    referenceDate={dayjs(dateValue)}
                    sx={{paddingRight: '10px'}}
                >

                </TimePicker>
            </LocalizationProvider>
            <Box>
            <FormControl>
                <InputLabel>Select an Instructor</InputLabel>
                <Select 
                    label='Search By Instrument'
                    onChange={handleInstructorSelect} 
                    value={instructorSelect} 
                    // multiple
                    sx={{width: '200px'}}
                    >
                    {allInstructors.map((instructor)=>{
                        return(
                            <MenuItem
                                key={instructor.id}
                                value={instructor.name}
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