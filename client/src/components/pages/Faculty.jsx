import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import FacultyCard from '../cards/FacultyCard';
import FilterCard from '../cards/FilterCard';

function Faculty() {
    const [instructors, setInstructors] = useState([])
    const [nameSearch, setNameSearch] = useState('')
    const [instrumentSearch, setInstrumentSearch] = useState([])


    useEffect(()=>{
        fetch('/api/instructors')
        .then(res=>res.json())
        .then(instructorsData=>{
            setInstructors(instructorsData)
         
        })
        .catch(error=>console.log(error))
    }, [])

    // console.log(instructors)

    const handleNameSearch = (e) =>{
        console.log(e.target.value)
        setNameSearch(e.target.value)
    }


    const filteredNames = instructors.filter((instructor)=>{
        
        if(nameSearch===''){
            return true
        }
    
        if(instructor.name.toLowerCase().includes(nameSearch.toLowerCase())){
            return true
        } 
    })

    console.log(nameSearch)
    console.log(filteredNames)
    
    const handleInstrumentSearch = (e) =>{
        console.log(e.target.value)
        setInstrumentSearch(e.target.value)
    }



    const facultyCards = 
        <Grid container spacing={5}>
            {filteredNames.map((instructor)=>(
                <Grid item key={instructor.id} xs={12} sm={6} md={3} lg={3}>
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
            <Box sx={{paddingTop: '50px', backgroundColor: '#E0E1DD', width: '100%', marginBottom: '20px'}}>
                <Typography variant='h2' sx={{color: 'black', fontSize: '80px', fontWeight: 'light', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Faculty
                </Typography>
            </Box>
            <Box>
                <FilterCard 
                    handleNameSearch={handleNameSearch}
                    nameSearch={nameSearch}
                    handleInstrumentSearch={handleInstrumentSearch}
                    instrumentSearch={instrumentSearch}
                />
            </Box>
            <Box sx={{flexGrow: 1}}>
                {facultyCards}
            </Box>
        </>
    );
}

export default Faculty;