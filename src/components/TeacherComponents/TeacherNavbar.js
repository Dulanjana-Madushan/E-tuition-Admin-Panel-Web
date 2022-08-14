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
import { useState } from 'react';
import Drawer from './TeacherDrawer';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { maxWidth } from '@mui/system';
import logo from '../../images/logo.png';
import profile from "../../images/john_doe.jpg";
import { Button } from '@mui/material';

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
      <Box sx={{display:'flex', height:"5"}}>
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1, 
            backgroundColor:"#4b0082" }}
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
            <IconButton
                edge="start"
                onClick={()=>{
                  history.push("/teacher");
              }}
              >
                <Avatar alt="logo" src={logo}/>
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{fontSize:30,color:"#EDF5E1"}}
            >
              tutorLK
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
              <Button onClick={()=>{
                  localStorage.removeItem('token');
                  history.push("/login");
                  }} 
                  sx={{fontSize:15,color:"#EDF5E1"}}>
                LogOut
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
                onClick={()=>{
                  history.push("/tprofile");
              }}
              >
                <Avatar alt="John Doe" src={profile}/>
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