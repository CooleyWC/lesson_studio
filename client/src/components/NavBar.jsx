import {Link, NavLink} from 'react-router-dom';
import {AppBar, Container, Typography, Toolbar, IconButton, Button, Box, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import React from 'react';

const pages = [
    {
        page: 'Login',
        route: '/Login',
    }
]

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null)

    const handleOpenNavMenu = (e)=>{
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = ()=>{
        setAnchorElNav(null)
    }


    return (
        <AppBar position='fixed' sx={{backgroundColor: 'gray'}}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>

                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        The Lesson Studio
                    </Typography>
                    {/* extra small screen */}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map(({page, route})=>(
                                <MenuItem
                                    key={page}
                                    component={NavLink}
                                    to={route}
                                    onClick={handleCloseNavMenu}
                                >
                                    {page}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* small screen */}
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href='#app-bar-with-responsive-menu'
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        The Lesson Studio
                    </Typography>
                    {/* desktop */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'flex-end'}}>
                        {pages.map(({page, route})=>(
                            <Button
                                key={page}
                                component={NavLink}
                                to={route}
                                sx={{my:2, color: 'white', display: 'block',
                                '&:hover': {
                                backgroundColor: 'white',
                                color: 'black'
                            }}}
                                onClick={handleCloseNavMenu}
                            >
                                <Typography>
                                    {page}
                                </Typography>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;