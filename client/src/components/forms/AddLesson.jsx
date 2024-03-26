import React, {useState} from 'react';
import {Paper, Box} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';


function AddLesson() {

    const [dateValue, setDateValue] = useState(null)
    const [timeValue, setTimeValue] = useState(null)
    // console.log('date', dateValue.$d)


    return (
        <Paper sx={{backgroundColor: 'white', height: '80px', paddingTop: '15px', paddingBottom: '15px', width: '100%'}}>
            <Box sx={{paddingTop: '20px', paddingLeft: '15px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label='Select Date'
            
                    value={dateValue}
                    onChange={newValue=>setDateValue(newValue)}
                    sx={{paddingRight: '10px'}}
                />
                <TimePicker
                    label='Select Time'
                    value={timeValue}
                    onChange={newValue=>setTimeValue(newValue)}
                    referenceDate={dayjs(dateValue)}
                >

                </TimePicker>
            </LocalizationProvider>
                
               
            </Box>
        </Paper>
    );
}

export default AddLesson;