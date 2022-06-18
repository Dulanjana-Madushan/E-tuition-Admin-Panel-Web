import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
//import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Drawer from './SideDrawer';
// import ClassCard from './TeacherClassList';
import AllClasses from '../pages/AllClasses';
// import { Container } from '@mui/material';
import PayTable from './PayTable';
//import {Drawer as MUIDrawer, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const history = useHistory();

  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
          
        >
          <Avatar />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{display:'flex', backgroundColor: '#adc345', height:"5"}}>
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1, 
            backgroundColor:'#379683' }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ mr: 2 ,display:{xm:'flex', sm:'none'}}}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{fontFamily:"Times New Roman" , fontSize:30,color:"#EDF5E1"}}
            >
              E - Tuition
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
                onClick={()=>{
                  history.push("/profile");
              }}
              >
                <Avatar alt="John Doe" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEuaL14xHFILfpNxSISzrJE3bnBckLdpHvA&usqp=CAU"/>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
      
        <Box sx={{display:'flex'}}>
          <Drawer open={open}/>
          {/*<TeacherHome path='/home'/>*/}
        </Box>
        
    
    
    </>
  );
}