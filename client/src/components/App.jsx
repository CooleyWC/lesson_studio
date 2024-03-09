import {Container, Typography} from '@mui/material'
import Header from './Header';
import { useEffect, useState} from 'react';

function App() {
  const [instructors, setData] = useState([])

  useEffect(()=>{
    fetch('http://127.0.1:5555/instructors')
    .then((r)=>r.json())
    .then((instructors)=> {
      setData(instructors)
      console.log(instructors)
    })
  }, [])



  const instructorNames = instructors.map((instructor)=>(
    <div>
      <p key={instructor.id}>{instructor.name}</p>
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
