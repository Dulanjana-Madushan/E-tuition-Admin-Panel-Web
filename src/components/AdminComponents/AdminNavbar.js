import * as React from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Button, 
  Toolbar, 
  Avatar,
  Badge, 
  styled, 
  Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from './SideDrawer';
import logo from '../../images/web_nav_logo.png';

export default function AdminNavbar() {
  
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();

  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  return (
    <>
      <Box sx={{display:'flex', backgroundColor: '#adc345', height:"5"}}>
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1, 
            backgroundColor:'white' }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ mr: 2 ,display:{xm:'flex', sm:'none'},color: "#3F51B5"}}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="logo"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <Avatar alt="tutorLK" src={logo}  />
              </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{fontSize:30,color:"#3F51B5"}}
            >
             tutorLK
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
              <Button onClick={()=>{
                  localStorage.removeItem('token');
                  localStorage.removeItem('role');
                  navigate("/login");
                  }} 
                  sx={{fontSize:15,color:"#3F51B5"}}>
                LogOut
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="show more"
                aria-haspopup="true"
                onClick={()=>{
                 navigate("/admin/aprofile");
                }}
              >
                 <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar/>
                </StyledBadge>
              </IconButton>
            
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    
      <Box sx={{display:'flex'}}>
        <Drawer open={open}/>
        <Outlet/>
      </Box>
      
        
    
    
    </>
  );
}