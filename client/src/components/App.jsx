import {Container, Typography} from '@mui/material'
import Header from './Header';
import { useEffect, useState} from 'react';

function App() {
  const [instructors, setData] = useState([])

  useEffect(()=>{
    fetch('/api/instructors')
    .then((r)=>r.json())
    .then((instructors)=> {
      setData(instructors)
      console.log(instructors)
    })
  }, [])



  const instructorNames = instructors.map((instructor)=>(
    <div key={instructor.id}>
      <p >{instructor.name}</p>
      <h2>{instructor.instrument}</h2>
      <img src={instructor.photo}></img>
    </div>
    
  ))

  return (
    <Container>
      <Header />
      <Typography>
        Lesson Studio
      </Typography>
      {instructorNames}
    </Container>
  )
}

export default App
