import React from 'react';
import { Typography, Container, CardMedia, Grid } from '@mui/material';

function Home() {
    return (
        <Container sx={{paddingTop: '100px'}}>
            <Typography>
                Take Lessons
            </Typography>
            <Grid container spacing={{xs: 2, md:3}} columns={{xs:4, sm: 8, md: 12}}>
                <Grid item xs={12} sm={4}  >
                    <CardMedia
                        component='img'
                        src='https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG11c2ljJTIwbGVzc29uc3xlbnwwfHwwfHx8MA%3D%3D'
                    >
                    </CardMedia>
                </Grid>
                <Grid item xs={12} sm={4}  >
                    <CardMedia
                        component='img'
                        src='https://images.unsplash.com/photo-1532342342267-77e8db262ebc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA2fHxtdXNpY3xlbnwwfHwwfHx8MA%3D%3D'
                    >
                    </CardMedia>
                </Grid>
                <Grid item xs={12} sm={4}  >
                    <CardMedia
                        component='img'
                        src='https://images.unsplash.com/photo-1599866193011-348f9eb29868?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljJTIwbGVzc29uc3xlbnwwfHwwfHx8MA%3D%3D'
                    >
                    </CardMedia>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;