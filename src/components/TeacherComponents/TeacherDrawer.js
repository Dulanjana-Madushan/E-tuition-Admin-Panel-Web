import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import { makeStyles }from '@mui/styles';
import { useState } from 'react';
import React, { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
    root: {
        "&$selected": {
          backgroundColor: "#F2F2F2",
          //width:200,
          borderRadius:10,
          marginLeft:5,
          marginRight:5,
          //border:20,
          //color: "#3F51B5",
          //borderTopLeftRadius:10,
          //borderBottomLeftRadius:10,
          "&:hover": {
            backgroundColor: "#F2F2F2"
          }
        },
        "&:hover": {
            backgroundColor: "white",
            transform: "scale3d(1, 1, 1)",
            transition: "0.5s"
          }
    },
    selected: {},
})

export default function SideDrawer({open}) {

    const styles = useStyles();
    const theme = useTheme();
     const navigate = useNavigate();
    const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));  
    const [selectedIndex, setSelectedIndex] = useState(0);
    const drawerWidth = 200;

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
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
                  backgroundColor:'ffffff',
                  borderRight:'none',
                  boxSizing: 'border-box',
                  boxShadow:5,
                },
            }}
        >
        <Toolbar />
            <Box>
                <List 
                    sx={{color:"#3F51B5"}}
                >
                    <Box
                 marginTop = {1}
                 marginBottom = {3}
                 marginLeft = {1}
                 marginRight = {1}
                 paddingTop = {1}
                 paddingBottom = {1}
                 display='flex'
                 flexWrap="wrap"
                sx={{justifyContent:'center',border:1, borderColor:'#E0E0E0',borderRadius: 2}}
            >
            <Typography
              sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}  
            >
              Welcome
            </Typography>
            </Box>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={() => {
                            setSelectedIndex(0);
                            navigate("/teacher/home")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <HomeRoundedIcon sx={{color:'#3F51B5'}} />
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Home</Typography>
                    </ListItemButton>
                    {/* <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => {handleListItemClick(1);
                         navigate("/teacher/chat")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <ChatIcon  sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Chat</Typography>

                    </ListItemButton> */}

                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => {handleListItemClick(2);
                        navigate("/teacher/tnotification")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <NotificationsIcon sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Notifications</Typography>
                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => {handleListItemClick(3);
                        navigate("/teacher/tsettings")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <SettingsIcon sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Settings</Typography>
                    </ListItemButton>

                </List>
            </Box>
        </Drawer>
    );
}


// import useMediaQuery from '@mui/material/useMediaQuery';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import ChatIcon from '@mui/icons-material/Chat';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { useTheme } from '@mui/material/styles';
// import { makeStyles }from '@mui/styles';
// import { useState } from 'react';
// import React, { useNavigate } from 'react-router-dom';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import { Typography } from '@mui/material';

// const useStyles = makeStyles({
//     root: {
//         "&$selected": {
//             backgroundColor: "white",
//             width:200,
//             color: "#4b0082",
//             borderTopLeftRadius:10,
//             borderBottomLeftRadius:10,
//             "&:hover": {
//                 backgroundColor: "white"
//             }
//         },
//         "&:hover": {
//             backgroundColor: "white",
//             transform: "scale3d(1.1, 1.1, 1)",
//             transition: "0.5s"
//         }
//     },
//     selected: {},
// })

// export default function SideDrawer({open}) {

//     const styles = useStyles();
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));
//     const [selectedIndex, setSelectedIndex] = useState(0);
//     const drawerWidth = 200;

//     return (
//         <Drawer
//             variant={isMdUp ? "permanent" : "temporary"}
//             anchor="left"
//             open={open}
//             sx={{width: drawerWidth,
//                 flexShrink: 0,
//                 '& .MuiDrawer-paper': {
//                     width: drawerWidth,
//                     backgroundColor:'#D9DDDC',
//                     borderRight:'none',
//                     boxSizing: 'border-box',
//                 },
//             }}
//         >
//             <Toolbar />
//             <Box>
//                 <List sx={{color:'#000000'}}>
//                     <ListItemButton
//                         selected={selectedIndex === 0}
//                         onClick={() => {
//                             setSelectedIndex(0);
//                             navigate("/teacher")}}
//                         classes={{
//                             root: styles.root,
//                             selected: styles.selected
//                         }}
//                         >
//                             <ListItemIcon>
//                                 <HomeIcon sx={{color:'#000000'}}/>
//                             </ListItemIcon>
//                             <Typography sx={{fontWeight: 600}}>Home</Typography>
//                     </ListItemButton>

//                     <ListItemButton
//                             selected={selectedIndex === 1}
//                             onClick={() => {
//                             setSelectedIndex(1);
//                             navigate("/teacher/chat")}}
//                             classes={{
//                                 root: styles.root,
//                                 selected: styles.selected
//                             }}
//                         >
//                             <ListItemIcon>
//                                 <ChatIcon sx={{color:'#000000'}}/>
//                             </ListItemIcon>
               
                       
//                             <Typography sx={{fontWeight: 600}}>Chat</Typography>
//                     </ListItemButton>

//                     <ListItemButton
//                         selected={selectedIndex === 2}
//                         onClick={() => {
//                         setSelectedIndex(2);
//                         navigate("/tnotification")}}
//                         classes={{
//                             root: styles.root,
//                             selected: styles.selected
//                         }}
//                     >
//                         <ListItemIcon>
//                             <NotificationsIcon sx={{color:'#000000'}}/>
//                         </ListItemIcon>
//                         <Typography sx={{fontWeight: 600}}>Notification</Typography>
//                     </ListItemButton>

//                     <ListItemButton
//                         selected={selectedIndex === 3}
//                         onClick={() => {
//                         setSelectedIndex(3);
//                         navigate("/setting")}}
//                         classes={{
//                             root: styles.root,
//                             selected: styles.selected
//                         }}
//                     >
                    
//                     <ListItemIcon>
//                         <SettingsIcon sx={{color:'#000000'}}/>
//                     </ListItemIcon>
//                     <Typography sx={{fontWeight: 600}}>Settings</Typography>
//                     </ListItemButton>
//                 </List>
//             </Box>
//         </Drawer>
//   );
// }