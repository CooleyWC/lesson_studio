import {Container, Typography} from '@mui/material'
import Header from './Header';
import {Outlet} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useAuth } from './context/AuthProvider';

function App() {

  const {user, login, logout, update} = useAuth()
  const [allInstructors, setAllInstructors] = useState([])


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

  useEffect(()=>{
    fetch('/api/instructors')
    .then(res=>res.json())
    .then(instructorsData=>{
        setAllInstructors(instructorsData)
    })
    .catch(error=>console.log(error))
}, [])
  

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

  const handleAddLesson = (newLesson)=>{
    update(prevUserData=>({
      ...prevUserData, lessons: [...prevUserData.lessons, newLesson]}))
  }
  
  return (
    <Container>
      <Header />
      <Outlet context={{handleLikeUpdate, allInstructors, handleAddLesson}}/>
    </Container>
  )
}

export default App
