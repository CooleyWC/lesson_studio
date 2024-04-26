import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';

function FacultyCard({name, instrument, bio, photo}) {

    return (
        <Card sx={{maxWidth: '350px', minHeight: '650px', maxHeight: '700px', margin: 0, padding: 0}}>
            <CardMedia
                component='img'
                image={photo}
                sx={{height: '300px'}}
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
        </Card>
    );
}

export default FacultyCard