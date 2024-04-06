import {Container, Typography} from '@mui/material'
import Header from './Header';
import {Outlet} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useAuth } from './context/AuthProvider';

function App() {

  const {user, login, logout, update} = useAuth()
  const [userInstructors, setUserInstructors] = useState([])
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
        // is this a good way to do this?
        if(user){
            setUserInstructors(user.instructors)
        }
     
    })
    .catch(error=>console.log(error))
}, [])

  // const handleAddFaculty = (instructor)=>{
    // if(!user){
    //   console.log('yo - log in first')
    //   return
    // }
    
    // const updatedInstructors = 

  // }
  

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
      <Outlet context={{handleLikeUpdate, userInstructors, setUserInstructors, allInstructors, setAllInstructors}}/>
    </Container>
  )
}

export default App
