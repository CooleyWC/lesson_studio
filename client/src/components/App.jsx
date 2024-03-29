import {Container, Typography} from '@mui/material'
import Header from './Header';
import {Outlet} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useAuth } from './context/AuthProvider';

function App() {

  const {user, login, logout, update} = useAuth()


  useEffect(()=>{
    checkUser()
  }, [])

  const checkUser = () => {
    fetch('/api/check_session')
    .then(res=>{
      if(res.ok){
        res.json().then(data=>login(data))
        // console.log('youre logged in')
      } else {
        // console.log('your not logged in')
        logout()
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handleAddFaculty = (instructor)=>{
    // if(!user){
    //   console.log('yo - log in first')
    //   return
    // }
    
    // const updatedInstructors = 

  }
  

  const handleLikeUpdate = (updatedLesson)=>{

    const userLessons = user.lessons

    const updatedLessons = userLessons.map((lesson)=>{
      if(lesson.id === updatedLesson.id){
        return updatedLesson
      } else {
        return lesson
      }
    })

    const updatedUser = {...user, lessons:updatedLessons}
    update(updatedUser)
 
  }
  

  return (
    <Container>
      <Header />
      <Outlet context={{handleLikeUpdate, handleAddFaculty}}/>
    </Container>
  )
}

export default App
