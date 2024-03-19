import React from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthProvider';

function Dashboard() {

    const {user} = useAuth()

    if(user === null) return <Typography sx={{color: 'white', fontSize: '50px', paddingTop: '100px'}}>Loading....</Typography>

    if(!user) {
    
        return (
            <Typography sx={{color: 'white', fontSize: '50px', paddingTop: '100px'}}>Hi! Please login to view dashboard</Typography>
        )
        }

    return (
        <>
        <Box sx={{paddingTop: '50px', backgroundColor: '#E0E1DD', width: '100%'}}>
            <Typography sx={{fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Dashboard</Typography>
        </Box>
        <Box>
            <Typography>Your profile</Typography>
        </Box>
        </>
    );
}

export default Dashboard;