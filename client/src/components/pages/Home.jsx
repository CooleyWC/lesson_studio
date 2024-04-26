import React from 'react';
import {Link} from 'react-router-dom';
import { Typography, CardMedia, Grid, Paper, Button, Box } from '@mui/material';

function Home() {

    return (
        <Box sx={{paddingTop: '100px'}}>
            <Grid container spacing={{xs: 2, md:3}} columns={{xs:4, sm: 8, md: 12}}>
                <Grid item xs={12} sm={4}  >
                    <CardMedia
                        component='img'
                        src='https://images.unsplash.com/photo-1532342342267-77e8db262ebc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA2fHxtdXNpY3xlbnwwfHwwfHx8MA%3D%3D'
                    >
                    </CardMedia>
                    <Paper sx={{borderRadius: 0, paddingBottom: '30px'}}>
                        <Typography sx={{paddingLeft: '20px'}}>1. Pick a Teacher</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}  >
                    <CardMedia
                        component='img'
                        src='https://images.unsplash.com/photo-1599866193011-348f9eb29868?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljJTIwbGVzc29uc3xlbnwwfHwwfHx8MA%3D%3D'
                    >
                    </CardMedia>
                    <Paper sx={{borderRadius: 0, paddingBottom: '30px'}}>
                        <Typography sx={{paddingLeft: '20px'}}>2. Take Lessons</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}  >
                    <CardMedia
                        component='img'
                        src='https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fG11c2ljfGVufDB8fDB8fHww'
                    >
                    </CardMedia>
                    <Paper sx={{borderRadius: 0, paddingBottom: '30px'}}>
                        <Typography sx={{paddingLeft: '20px'}}>3. Become Awesome</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container sx={{marginTop: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid item>
                    <Button component={Link} to='/faculty' variant='contained' size='large' sx={{backgroundColor: '#415A77', minWidth: '400px'}}>Start Here: Meet The Faculty</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;

