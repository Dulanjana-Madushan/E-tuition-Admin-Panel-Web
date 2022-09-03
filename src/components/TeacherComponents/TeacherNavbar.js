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
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from './TeacherDrawer';
import { BrowserRouter as Router, Route, Switch, Outlet} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import profile from "../../images/john_doe.jpg";
import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import logo from '../../images/web_nav_logo.png';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

export default function AdminNavbar() {

  const [selectedImage, setSelectedImage] = useState(null);
  const {data, isLoading, error} = useFetch(base_url + '/auth/me');
  console.log(data);
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
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
          {/* <Outlet /> */}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      
      {/* <MenuItem>
        <IconButton
          size="medium"
          aria-label="account of current user"
          color="inherit"
          onClick={()=>{
            navigate("/aprofile");
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
      </MenuItem> */}
    </Menu>
    
  );

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
        //animation: 'ripple 1.2s infinite ease-in-out',
        //border: '1px solid currentColor',
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
                  navigate("/login");
                  }} 
                  sx={{fontSize:15,color:"#3F51B5"}}>
                LogOut
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
            {data && <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                //onClick={handleMobileMenuOpen}
                onClick={()=>{
                 navigate("/teacher/tprofile");
                }}
              >
                 <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt="John Doe" src={data.photo.webContentLink}/>
                </StyledBadge>
              </IconButton>
            } 
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
    
      <Box sx={{display:'flex'}}>
        <Drawer open={open}/>
        <Outlet/>
      </Box>
      
        
    
    
    </>
  );
}