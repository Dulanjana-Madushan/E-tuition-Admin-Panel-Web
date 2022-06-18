import useMediaQuery from '@mui/material/useMediaQuery';
//import Box from '@mui/material/Box';
//import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import { makeStyles }from '@mui/styles';
import { useState } from 'react';
import React, { useHistory } from 'react-router-dom';

import { withRouter } from "react-router-dom";
import {Drawer , Box } from '@mui/material';


const useStyles = makeStyles({
    root: {
        "&$selected": {
          backgroundColor: "white",
          width:200,
          //color: "Blue",
          borderTopLeftRadius:10,
          borderBottomLeftRadius:10,
          "&:hover": {
            backgroundColor: "white"
          }
        },
        "&:hover": {
            backgroundColor: "grey"
          }
    },
    selected: {},
    drawer:{
      width:"200px"
    }
})

{/*export default function TeacherDrawer({open}) {

    const styles = useStyles();
    const theme = useTheme();
    // const history = useHistory();
    const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const drawerWidth = 200;

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        // localStorage.setItem('token', null);
        // history.push('/login');
    };

    return (
        <Drawer
            variant={isMdUp ? "permanent" : "temporary"}
            anchor="left"
            open={open}
            sx={{width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  backgroundColor:'#66bb6a',
                  borderRight:'none',
                  boxSizing: 'border-box',
                },
            }}
        >
        <Toolbar />
            <Box>
                <List 
                    sx={{color:'white'}}
                >
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(0)}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>


                

                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(1)}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat" />
                    </ListItemButton>




                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(2)}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItemButton>


                </List>
            </Box>
        </Drawer>
    );
}*/}




export default function SideDrawer({open}) {

  const styles = useStyles();
  const theme = useTheme();
  //const { history } = props;
  const history = useHistory();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const drawerWidth = 200;

  const handleListItemClick = (index) => {
      setSelectedIndex(index);
      // localStorage.setItem('token', null);
      // history.push('/login');
  };

  const itemsList = [
    {
      text: "Home",
      icon: <HomeRoundedIcon  />,
      onClick: () => history.push("/")
    },
    {
      text: "All classes",
      icon: <SchoolRoundedIcon />,
      onClick: () => history.push("/allclasses")
    
    },
    {
      text: "Teachers",
      icon: <BoyRoundedIcon fontSize="large" />,
      onClick: () => history.push("/teachersDetails")
    },
    {
      text: "Students",
      icon: <EscalatorWarningRoundedIcon />,
      onClick: () => history.push("/studentsDetails")
    },
    {
      text: "Notification",
      icon: <NotificationsIcon />,
      onClick: () => history.push("/notification")
    }
  ];

  return (
      <Drawer
          variant={isMdUp ? "permanent" : "temporary"}
          anchor="left"
          open={open}
          sx={{width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                backgroundColor:'#379683',
                borderRight:'none',
                boxSizing: 'border-box',
              },
          }}
      className={styles.drawer}>
      <Toolbar />
          <Box>
          <List sx={{color:'#000000'}}>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItemButton
              >
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon sx={{color:'#000000'}}>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              </ListItemButton>
              
            );
          })}
        </List>
          </Box>
      </Drawer>
  );
}

