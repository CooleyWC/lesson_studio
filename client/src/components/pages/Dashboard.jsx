import React from 'react';
import { Typography, Box, Grid, Card, Stack } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import ProfileCard from '../cards/ProfileCard';
import InstructorCardDash from '../cards/InstructorCardDash';
import LessonCard from '../cards/LessonCard';
import { useOutletContext } from 'react-router-dom';
import AddLesson from '../forms/AddLesson';


function Dashboard() {

    const {user} = useAuth()
    const {handleLikeUpdate, allInstructors, handleAddLesson, handleLessonDelete} = useOutletContext();

    if(user===null || !user){
        return <p>loading</p>
    }

    const instructorsOnDash = user.instructors

    const handleLessonUpdate = (id, newRating)=>{

        fetch(`/api/lessons/${id}`,{
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({user_rating:newRating}),
        })
        .then((res)=>{
            if(res.ok){
                res.json().then(updatedLesson=>{
                    handleLikeUpdate(updatedLesson)
                })
            } else {
                res.json().then(error=>console.log(error))
            }
        })
    }

    const handleDelete = (id)=>{
        fetch(`/api/lessons/${id}`,{
            method: "DELETE"
        })
        .then((res)=>{
            if(res.ok){
                handleLessonDelete(id, instructorsOnDash)
            }
        })
    }

    const handleScheduleLesson = (obj)=>{
        fetch('/api/lessons', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then((res)=>{
            if(res.ok){
                res.json().then(lesson=>{
                    handleAddLesson(lesson, instructorsOnDash)
                })
            } else {
                res.json().then(error=>console.log(error))
            }
        })
    }

    const instructors = user.instructors

    const instructorsMap = instructors.map((instructor)=>{
        return (
        <Grid item key={instructor.id} >
            <InstructorCardDash 
                key={instructor.id}
                name={instructor.name}
                instrument={instructor.instrument}
                photo={instructor.photo}
                email={instructor.email}
            />
        </Grid>
        )
    })

    const lessons = user.lessons

    const lessonsMap = lessons.map((lesson)=>{
        return (
            <LessonCard 
                key={lesson.id}
                lessonId={lesson.id}
                instructor={lesson.instructor.name}
                lessonInstrument={lesson.instructor.instrument}
                date={lesson.date_time}
                rating={lesson.user_rating}
                onUpdate={handleLessonUpdate}
                onDeleteLesson={handleDelete}
            />
        )
    }) 

    return (
        <>
        <p>{user.username}</p>
        <Box sx={{paddingTop: '30px', backgroundColor: '#E0E1DD', width: '100%', marginBottom: '10px'}}>
            <Typography sx={{fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Dashboard</Typography>
         
        </Box>
        <Box sx={{marginBottom: '20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4} lg={3}>
                <Card sx={{marginTop: '10px', marginBottom: '10px', minWidth: '50px'}}>
                    <Typography sx={{paddingLeft: '20px', fontSize: '30px'}}>Your Profile</Typography>
                </Card>
                <ProfileCard name={user.username} age={user.age} primary_instrument={user.primary_instrument}/>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={9}>
                <Card sx={{marginTop: '10px', marginBottom: '10px', minWidth: '50px'}}>
                    <Typography sx={{paddingLeft: '20px', fontSize: '30px'}}>Your Instructors</Typography>
                </Card>
                <Grid container item spacing={2} sx={{display: 'flex', justifyContent: 'start', alignItems: 'flex-start'}}>
                {instructorsMap}
                </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
            <AddLesson 
                allInstructors={allInstructors}
                user={user}
                handleScheduleLesson={handleScheduleLesson}
            />
        </Box>
        <Box sx={{backgroundColor: '#0D1B2A', width: '100%', borderRadius: '5px'}}>
            <Card sx={{marginTop: '10px', marginBottom: '10px', minWidth: '50px'}}>
                <Typography sx={{paddingLeft: '20px', fontSize: '30px'}}>Your Lessons</Typography>
            </Card>
            <Stack spacing={1}>
            {lessonsMap}
            </Stack>
        </Box>
        </>
    );
}

export default Dashboard;