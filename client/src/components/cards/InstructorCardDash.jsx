import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material'

function InstructorCardDash({name, instrument, photo, email}) {
    return (
        <Card sx={{maxWidth: '250px', maxHeight: 'auto'}}>
            <CardMedia component='img'src={photo} sx={{maxHeight: '250px'}}/>
            <CardContent>
                <Typography>{name}</Typography>
                <Typography>{email}</Typography>
                <Typography>{instrument}</Typography>

            </CardContent>
        </Card>
    );
}

export default InstructorCardDash;