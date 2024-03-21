import React, {useState} from 'react';
import {Typography, Paper, Button, Box} from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function LessonCard({instructorId, date, rating}) {


    const [thumbUp, setThumbUp] = useState(rating)


    const jsDate = new Date(date)
    const dateFormat = jsDate.toLocaleDateString()
    const hour = jsDate.getHours().toString() + ':'
    const minutes = jsDate.getMinutes().toString()
    let ampm = ''
    if(hour <= '12'){
        ampm = 'AM'
    } else {
        ampm = 'PM'
    }
    const dateAndtime = dateFormat + ' ' + hour + minutes + ' ' + ampm


    return (
        <Paper sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
            <Box>
                <Typography>{dateAndtime} <Button>Edit</Button> </Typography>
            </Box>
            <Box>
                <Typography>{instructorId}</Typography>
            </Box>
            <Box>
                {thumbUp ? (
                    <ThumbUpAltIcon sx={{color: 'blue'}} onClick={()=>setThumbUp(false)}/>
                ): (<ThumbUpOffAltIcon onClick={()=>setThumbUp('true')}/>)}
            </Box>
        </Paper>
    );
}

export default LessonCard;