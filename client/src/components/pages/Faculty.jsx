import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import FacultyCard from '../cards/FacultyCard';
import Filter from '../forms/Filter';
import { useOutletContext } from 'react-router-dom';

function Faculty() {
    const {handleAddFaculty} = useOutletContext()

    const [instructors, setInstructors] = useState([])
    const [nameSearch, setNameSearch] = useState('')
    const [instrumentSearch, setInstrumentSearch] = useState('all')


    useEffect(()=>{
        fetch('/api/instructors')
        .then(res=>res.json())
        .then(instructorsData=>{
            setInstructors(instructorsData)
         
        })
        .catch(error=>console.log(error))
    }, [])


    const onAddFaculty = async (selection)=>{
        console.log('faculty selected', selection)

        // need to make a new route, patch, send to handle add faculty function in app

    }


    const handleInstrumentSearch = (e) =>{
        console.log(e.target.value)
        setInstrumentSearch(e.target.value)
    }

    const filteredInstrumentSearch = instructors.filter((instructor)=>{
        if(instrumentSearch==='all'){
            return instructor
        }
        if(instructor.instrument===instrumentSearch){
            return instructor
        }
    })


    const handleNameSearch = (e) =>{
        console.log(e.target.value)
        setNameSearch(e.target.value)
    }


    const filteredNames = filteredInstrumentSearch.filter((instructor)=>{
        
        if(nameSearch===''){
            return instructor
        }
    
        if(instructor.name.toLowerCase().includes(nameSearch.toLowerCase())){
            return instructor
        } 
    })

    const facultyCards = 
        <Grid container spacing={5}>
            {filteredNames.map((instructor)=>(
                <Grid item key={instructor.id} xs={12} sm={6} md={3} lg={3}>
                    <FacultyCard
                        instructorObj={instructor}
                        key={instructor.id}
                        name={instructor.name}
                        instrument={instructor.instrument}
                        bio={instructor.bio}
                        photo={instructor.photo}
                        onAddFaculty={onAddFaculty}
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
                <Filter 
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