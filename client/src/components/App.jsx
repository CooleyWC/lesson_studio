import {Container} from '@mui/material'
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
      } else {
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

  const handleAddLesson = (newLesson, instructorsOnDash)=>{

    const updateInstructors = instructorsOnDash.find((instructor)=>{
      return instructor.id===newLesson.instructor_id
    })

    if(!updateInstructors){
      update(prevUserData=>({
        ...prevUserData, lessons: [...prevUserData.lessons, newLesson], instructors: [...prevUserData.instructors, newLesson.instructor]}))
    } else {
      update(prevUserData=>({
        ...prevUserData, lessons: [...prevUserData.lessons, newLesson]}))
    }
  }

  const handleLessonDelete = (id, instructorsOnDash)=>{
    const usersLessons = user.lessons
    const lessonsAfterDelete = usersLessons.filter((lesson)=>{
      return lesson.id !== id
    })

    const postDeleteInstructors = lessonsAfterDelete.map((lesson)=>{
      return lesson.instructor
    })

    const instructorsPostDelete = []
    for(let i=0; i<instructorsOnDash.length; i++){
      if(postDeleteInstructors[i] && instructorsOnDash[i] && instructorsOnDash[i].id === postDeleteInstructors[i].id){
        instructorsPostDelete.push(instructorsOnDash[i])
        console.log(postDeleteInstructors[i].id, instructorsOnDash[i].id)
      } else {
        console.log('instructors updated')
      }
    }

    update(prevUserData=>({
      ...prevUserData, lessons: [...lessonsAfterDelete], instructors: [...instructorsPostDelete]
    }))

}
  
  return (
    <Container>
      <Header />
      <Outlet context={{handleLikeUpdate, allInstructors, handleAddLesson, handleLessonDelete}}/>
    </Container>
  )
}

export default App
