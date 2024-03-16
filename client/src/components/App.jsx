import {Container, Typography} from '@mui/material'
import Header from './Header';
import {Outlet} from 'react-router-dom';
import { useEffect, useState} from 'react';

function App() {

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default App
