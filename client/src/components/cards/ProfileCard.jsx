import React from 'react';
import {Card, CardContent, Typography} from '@mui/material'

function ProfileCard({name, age, primary_instrument}) {
    return (
        <Card>
            <CardContent sx={{paddingLeft: '10px'}}>
            <Typography>Name: {name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            <Typography>Age: {age}</Typography>
            <Typography>Primary Instrument: {primary_instrument.charAt(0).toUpperCase() + primary_instrument.slice(1)}</Typography>
            </CardContent>
        </Card>
    );
}

export default ProfileCard;