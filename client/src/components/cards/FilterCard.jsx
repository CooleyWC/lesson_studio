import React from 'react';
import {Box, InputLabel, Select, Paper, TextField, MenuItem, FormControl} from '@mui/material';

function FilterCard({handleNameSearch, nameSearch, handleInstrumentSearch, instrumentSearch}) {

    const VALID_INSTRUMENTS = [
        'all',
        'piano', 
        'drums', 
        'bass', 
        'guitar', 
        'trumpet',
        'trombone', 
        'tuba', 
        'french horn', 
        'cello', 
        'violin', 
        'viola', 
        'voice'
    ]


    return (
        <Paper sx={{height: '80px', paddingTop: '15px', paddingBottom: '15px', width: '100%', display: 'flex', justifyContent: 'space-around'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <FormControl>
                    <TextField variant='outlined' sx={{paddingRight: '40px'}}label='Search by Name' onChange={handleNameSearch} value={nameSearch}/>
                </FormControl>
                <FormControl>
                <InputLabel>Search By Instrument</InputLabel>
                <Select 
                    label='Search By Instrument'
                    onChange={handleInstrumentSearch} 
                    value={instrumentSearch} 
                    // multiple
                    sx={{width: '200px'}}
                    >
                    {VALID_INSTRUMENTS.map((instrument)=>{
                        return(
                            <MenuItem
                                key={instrument}
                                value={instrument}
                            >
                                {instrument}
                            </MenuItem>
                        )
                    })}
                </Select>
                </FormControl>
            </Box>
        </Paper>
    );
}

export default FilterCard;