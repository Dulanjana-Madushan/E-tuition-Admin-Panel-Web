/*import React from 'react'

function Notification() {
  return (
    <div className="notification">Notification</div>
  );
}

export default Notification;*/

import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import useFetch from '../../services/useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FixedSizeList } from 'react-window';
import * as React from 'react';
import { blueGrey} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Notifications from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import List from '@mui/material/List';

import { makeStyles } from '@mui/styles';


 


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TNotification = () => {

    const {subjectid} = useParams();
    const [datax, setDatax] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [openx, setOpenx] = useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState([]);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(event);
      console.log(index);
      console.log(event);
    }

    const handleClickOpen = () => {
        setOpenx(true);
    };

    const handleClose = () => {
        setOpenx(false);
    };

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/subjects/' + subjectid + '/notification', {
            method: 'GET',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')}},
        )
            .then(res =>{
                return res.json();
            })
            .then(datax => {
                if(datax['success']){
                    setDatax(datax['data']);
                }else{
                    setError(datax['error'])
                }
                setIsLoading(false);
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    setError('Fetch aborted');
                }else{
                    setIsLoading(false);
                    setError(err.message);
                }
            })
            console.log(datax);
            return () => abortCont.abort();

    },[updated])

    
    // const {datax, isLoading, error} = useFetch('http://localhost:5000/subjects/myclasses/5d7a514b5d2c12c7449be041');

    function renderRow(props) {
      const { index, style } = props;
     
      return (
        
        <List component="nav" aria-label="main mailbox folders">
        <ListItem style={{height:'70'}} key={index} component="div" disablePadding >

          <ListItemButton 
              selected={index}
              onClick={(event) => handleListItemClick(datax[index], index)}
          >
  
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blueGrey[400] }}>
              <Notifications/>
              </Avatar>
            </ListItemAvatar>
          
              
                <ListItemText primary={<Typography variant="h10" style={{ color: '#000000' ,fontSize: '10'}}>{datax[index].title}</Typography>} 
                secondary={datax[index].description}  />
              
          </ListItemButton>
          
        </ListItem>
      </List>
      );
    }

    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
        >
             <Box
                marginTop = {2}
                display='flex'
                flexWrap="wrap"
                marginBottom={2}
                sx={{justifyContent:'center',backgroundColor:'#D9DDDC',borderRadius: 2}}
            >
            <Typography
              sx={{fontSize:30,mb:1,mt:1}} 
            >
              My Notifications
            </Typography>
            </Box>

            <Box style = {{backgroundColor:'#D9DDDC'}}> 
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

              {/* Notification List */}
            <Grid item xs={3}>
              <Item>
              <Typography
                    sx={{fontFamily:"Times New Roman" , fontSize:20,mb:1,mt:1, alignItems: "center"}} 
                    >
                     Notifications
                </Typography>
              </Item>

              <Item>
                  <Box sx={{ width: '100%', height: 480, maxWidth: 360, bgcolor: 'background.paper' }}>
                    {datax && datax.map((data) => (
                      <div key={data._id}>
                        <FixedSizeList 
                        height={480}
                        width={300}
                        itemSize={46}
                        overscanCount={5}
                        itemCount={datax.length}
                      >
                        {renderRow}
                      </FixedSizeList>
                      </div>
                    ))}
                  
                  </Box>
              </Item>

            </Grid>

            {/* Full Notification */}
            <Grid item xs={9}>

            {/* <Item>
              <Typography
                  sx={{fontFamily:"Times New Roman" , fontSize:20,mb:1,mt:1}} 
                  >
                     
                  </Typography>
              </Item> */}

            <Container fixed>
              <Box 
              display='flex'
              flexDirection='column'
              sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
              >
                <Box
                    marginTop = {2}
                    display='flex'
                    flexWrap="wrap"
                    marginBottom={2}
                    sx={{justifyContent:'center',backgroundColor:'#D9DDDC',borderRadius: 2}}
                >
                
                </Box>
            
                <Box
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center'}}
                >

                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div color="red">{error}</div>}
                {isLoading && <CircularProgress color="primary" />}

                </Box>
                <Box
                  display='flex'
                  flexWrap="wrap"
                  flexDirection="column"
                  sx={{justifyContent:match?'center':'start'}}
                >
                 
                {/* {datax && datax.map((item) => (
                    <div key={item._id}>
                        <Box sx={{ mt: 2}}>
                            <Typography>{item.title}</Typography>
                            <Typography>{item.description}</Typography>
                            <Typography>{item.time.substring(0,10)}</Typography> 
                        </Box>
                    </div>
                ))} */}
                <Box sx={{ mt: 2}}>
                            <Typography>{selectedIndex.title}</Typography>
                            <Typography>{selectedIndex.description}</Typography>
                            <Typography>{selectedIndex.time}</Typography> 
                        </Box>
              </Box>
           </Box>
          </Container>
          </Grid>
          </Grid>
        </Box>
        </Box>  
    );
}

 
export default TNotification;

