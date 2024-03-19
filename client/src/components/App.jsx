import {Container, Typography} from '@mui/material'
import Header from './Header';
import {Outlet} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useAuth } from './context/AuthProvider';

function App() {

  const {user, login, logout} = useAuth()


  useEffect(()=>{
    checkUser()
  }, [])

  const checkUser = () => {
    fetch('/api/check_session')
    .then(res=>{
      if(res.ok){
        console.log('youre logged in')
        login()
      } else {
        console.log('your not logged in', res.error)
        logout()
      }
    })
  }
  

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default App
