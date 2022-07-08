import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/More';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from './SideDrawer';
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
          size="medium"
          aria-label="account of current user"
          color="inherit"
          onClick={()=>{
            history.push("/aprofile");
          }}
          
        >
      
        </IconButton >
        <p>Profile</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="medium"
          aria-label="log out"
          color="inherit"
        >
       
        </IconButton>
        <p>log out</p>
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
              sx={{ mr: 2 ,display:{xm:'flex', sm:'flex'}}}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{fontSize:30,color:"#EDF5E1"}}
            >
              E - Tuition
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
                color="inherit"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                //onClick={()=>{
                //  history.push("/aprofile");
                //}}
              >
                <Avatar alt="John Doe" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_YtLi_0fU9VqLch7g0n4WzIAuQJnjLZu-hA&usqp=CAU"/>
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