import React from 'react';
import { Container, FormControl, Typography, Grid, TextField, Box , Button, Divider} from '@mui/material';


function Login() {

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('submitted')
    }

    const handleCreateAccount = (e)=>{
        console.log('new account')
    }

    const containerStyle = {
        marginTop: '150px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }

    const boxStyle = {
        backgroundColor: '#E0E1DD',
        border: '1px solid grey', 
        borderRadius: '20px',
        paddingTop: '75px', 
        paddingBottom: '100px', 
        paddingRight: '50px', 
        paddingLeft: '50px'
    }

    const createAccountBtnStyle = {
        minWidth: '200px', 
        backgroundColor: 'green', 
        '&: hover': 
            {backgroundColor: 'darkgreen'}
    }

    return (
        <Container className='container' sx={containerStyle}>
        <Box sx={boxStyle}>
            <form onSubmit={handleSubmit}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item sx={{marginTop: '20px', marginBottom:'20px'}}>
                        <FormControl>
                            <TextField label="Enter Your Email"/>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <FormControl>
                            <TextField label="Enter Your Password"/>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginBottom:'20px'}}>
                        <Button type='submit' variant='contained' size='large' sx={{minWidth: '200px'}}>Log In</Button>
                    </Grid>
                </Grid>
            </form>
            <Divider variant='middle' sx={{height: '4px', opacity: 1}}/>
            <Grid item sx={{marginTop: '10px'}}>
                <Typography variant='body2' sx={{marginBottom:'20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#13293d'}}>
                    Not yet enrolled? Sign up here
                </Typography>
            </Grid>
                <Grid item sx={{marginBottom:'20px'}}>
                    <Button variant='contained' size='large' sx={createAccountBtnStyle} onClick={handleCreateAccount}>Create New Account</Button>
                </Grid>
        </Box>
        </Container>
    );
}

export default Login;