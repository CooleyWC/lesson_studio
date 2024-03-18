import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import FacultyCard from './FacultyCard';

function Faculty() {
    const [instructors, setInstructors] = useState([])


    useEffect(()=>{
        fetch('/api/instructors')
        .then(res=>res.json())
        .then(instructorsData=>{
            setInstructors(instructorsData)
         
        })
        .catch(error=>console.log(error))
    }, [])

    console.log(instructors)

    const facultyCards = 
        <Grid container spacing={1}>
            {instructors.map((instructor)=>(
                <Grid item key={instructor.id} xs={12} sm={6} md={4}>
                    <FacultyCard
                        key={instructor.id}
                        name={instructor.name}
                        instrument={instructor.instrument}
                        bio={instructor.bio}
                        photo={instructor.photo}
                    />
                </Grid>
            ))}
        </Grid>
 
    
    return (
        <>
            <Box sx={{paddingTop: '50px', backgroundColor: '#E0E1DD', width: '100%', margin: 0}}>
                <Typography variant='h2' sx={{color: 'black', fontSize: '80px', fontWeight: 'light', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Faculty
                </Typography>
            </Box>
            <Box sx={{flexGrow: 1}}>
                {facultyCards}
            </Box>
        </>
    );
}

export default Faculty;