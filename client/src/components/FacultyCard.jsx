import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';

function FacultyCard({name, instrument, bio, photo}) {

    

    return (
        <Card sx={{width: '350px', height: 'auto', margin: 0, padding: 0}}>
            <CardMedia
                component='img'
                image={photo}
                sx={{maxHeight: '350px'}}
            />         
            <CardContent>
                <Typography variant='h3'>
                {name}
                </Typography>
                <Typography variant='h5' sx={{paddingLeft: '10px'}}>
                {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
                </Typography>
                <Typography sx={{paddingTop: '15px'}}>
                {bio}
                </Typography>
            </CardContent>
            <CardActions>
                <Button>Schedule A Lesson</Button>
            </CardActions>
        </Card>
    );
}

export default FacultyCard