import React, {useEffect, useState} from 'react';
import {Typography, Paper, Button, Box} from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function LessonCard({instructor, date, rating, lessonInstrument, onUpdate, lessonId}) {


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

    useEffect(()=>{
        if(rating === false){
            setThumbUp(false)
        } else{
            setThumbUp(true)
        }
    }, [rating])


    return (
        <Paper sx={{height: '50px', paddingTop: '20px', width: '100%', display: 'flex', justifyContent: 'space-around'}}>
            <Box>
                <Typography sx={{alignSelf: 'flex-start', paddingRight: '100px', paddingLeft: '20px'}}>{dateAndtime}</Typography>
            </Box>
            <Box>
                <Typography sx={{paddingRight: '100px'}}>{instructor}</Typography>
            </Box>
            <Box>
                <Typography sx={{paddingRight: '100px'}}>{lessonInstrument}</Typography>
            </Box>
            <Box>
                {thumbUp ? (
                    <ThumbUpAltIcon sx={{color: 'blue'}} onClick={()=>{
                        onUpdate(lessonId,false)
                        setThumbUp(false)
                    }}/>
                ): (<ThumbUpOffAltIcon onClick={()=>{
                    onUpdate(lessonId, true)
                    setThumbUp(true)
                    }}/>)}
            </Box>
            <Box>
                <Button variant='outlined' color='error' >Cancel</Button>
            </Box>
        </Paper>
    );
}

export default LessonCard;