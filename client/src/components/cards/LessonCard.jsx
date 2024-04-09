import React, {useEffect, useState} from 'react';
import {Typography, Paper, Button, Box} from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function LessonCard({instructor, date, rating, lessonInstrument, onUpdate, lessonId, onDeleteLesson}) {
    // console.log(date)


    const jsDate = new Date(date)
    const dateFormat = jsDate.toDateString()
    const formattedDate = jsDate.toLocaleString()
    const timeFormat = formattedDate.split(',')


    const dateAndtime = dateFormat + " " + timeFormat[1]


    return (
        <Paper sx={{backgroundColor: '#81c3d7', height: '50px', paddingTop: '20px', width: '100%', display: 'flex', justifyContent: 'space-around'}}>
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
                {rating ? (
                    <ThumbUpAltIcon sx={{color: 'blue'}} onClick={()=>{
                        onUpdate(lessonId, false)
                    }}/>
                ): (<ThumbUpOffAltIcon onClick={()=>{
                    onUpdate(lessonId, true)
                    }}/>)}
            </Box>
            <Box>
                <Button variant='outlined' color='error' onClick={()=>{onDeleteLesson(lessonId)}}>Cancel</Button>
            </Box>
        </Paper>
    );
}

export default LessonCard;