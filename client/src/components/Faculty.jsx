import React from 'react';
import { Container, Box, Typography } from '@mui/material';

function Faculty() {
    return (
        // <Container>
            <Box sx={{border: '2px solid black', paddingTop: '50px', backgroundColor: 'white', width: '100%'}}>
                <Typography sx={{color: 'black', fontSize: '100px'}}>
                    Faculty
                </Typography>
            </Box>
        // </Container>
    );
}

export default Faculty;