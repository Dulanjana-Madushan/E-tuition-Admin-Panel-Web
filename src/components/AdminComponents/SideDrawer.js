import { useState } from 'react';
import React, { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useTheme } from '@mui/material/styles';
import { makeStyles }from '@mui/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
    root: {
        "&$selected": {
          backgroundColor: "#F2F2F2",
          borderRadius:10,
          marginLeft:5,
          marginRight:5,
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
                            navigate("/admin/home")}}
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
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => {handleListItemClick(1);
                         navigate("/admin/allclasses")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <SchoolRoundedIcon sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Classes</Typography>

                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => {handleListItemClick(2);
                        navigate("/admin/allteachers")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <BoyRoundedIcon sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Teachers</Typography>
                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => {handleListItemClick(3);
                        navigate("/admin/allstudents")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <EscalatorWarningRoundedIcon sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Students</Typography>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={(event) => {handleListItemClick(4);
                        navigate("/admin/verification")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <WorkspacePremiumIcon sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Verification</Typography>
                    </ListItemButton>
                    {/* <ListItemButton
                        selected={selectedIndex === 5}
                        onClick={(event) => {handleListItemClick(5);
                        navigate("/admin/settings")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <SettingsIcon sx={{color:'#3F51B5'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Settings</Typography>
                    </ListItemButton> */}
                </List>
            </Box>
        </Drawer>
    );
}