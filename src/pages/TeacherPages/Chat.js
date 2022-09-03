/*import React from 'react'

function Chat() {
  return (
    <div className="chat">Chat</div>
  );
}

 export default Chat;*/

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import useFetch from '../../services/useFetch';
//import chatListFetch from '../../services/message';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import john from '../../images/john_doe.jpg'

import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Message1 from './Message1';
import io from "socket.io-client";
import { CenterFocusStrong } from '@mui/icons-material';

const socket = io.connect("http://localhost:5000");


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Chat = () => {

    const [username,setUserName] = useState("Ruwan");
    const [room,setRoom] = useState("1234");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    // const [open, setOpen] = useState(false);

    // const [name , setName] = useState(null);
    // const [message, setMessage] = useState(null);
    // const [profile, setProfile]= useState(null)

    useEffect(()=>{
      const abortCont = new AbortController();

      fetch('http://localhost:5000/msges', {
          method: 'GET',
          headers: {"Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')}},
      {signal:abortCont.signal})
          .then(res =>{
              // if(!res.ok){
              //     throw Error('Could not fetch data');
              // }
              return res.json();
          })
          .then(data => {
              if(data['success']){
                  setData(data['data']);
              }else{
                  setError(data['error'])
              }
              setIsLoading(false);
              // setError(null);
          })
          .catch(err => {
              if(err.name === "AbortError"){
                  console.log('Fetch aborted');
              }else{
                  setIsLoading(false);
                  setError(err.message);
              }
          })

          return () => abortCont.abort();

  },[])

  console.log(data)
  
    function renderRow(props) {
      const { index, style } = props;
     
      return (
        
        <ListItem style={style} key={index} component="div" disablePadding >
          <ListItemButton>
            
            <ListItemAvatar>
                  <Avatar
                    // alt={`Avatar n°${value + 1}`}
                    // src={`/src/images/avatar/${value + 1}.jpg`}
                     src={john}
                  />
            </ListItemAvatar>

              {error && <div>{error}</div>}
              {isLoading && <CircularProgress color="success" />} 

              {/* {data && data.data.map((item) => (
                <div key={item._id}>
                  <ListItemText primary={` ${item['student']['name']}`} /> 
                </div>
              ))} */}
              
              <Typography 
              sx={{fontFamily:"Times New Roman" , fontSize:15,mb:1,mt:1}} >
                Student Name
              </Typography> 
             
              <Typography 
                sx={{fontFamily:"Times New Roman" , fontSize:15,mb:1,mt:1}} >
                  
              </Typography> 
            
                 
          </ListItemButton>
          
        </ListItem>
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
              My Chats
            </Typography>
            </Box>

            <Box style = {{backgroundColor:'#D9DDDC'}}> 
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

              {/* Contacts List */}
              <Grid item xs={3}>
                {/* <h1 style={{ color: "green" }}>Contacts</h1> */}
                <Typography
                sx={{fontFamily:"Times New Roman" , fontSize:28,mb:1,mt:1, alignItems: "center"}} 
                >
                  Contacts
                </Typography>
              
                <Item>
                  <Box sx={{ width: '100%', height: 480, maxWidth: 360, bgcolor: 'background.paper' }}>
                  <FixedSizeList
                    height={480}
                    width={300}
                    itemSize={46}
                    itemCount={20}
                    overscanCount={5}
                  >
                    {renderRow}
                  </FixedSizeList>
                </Box>
                </Item>
              </Grid>
              

              {/* Message Box */}
              <Grid item xs={9} >
                 {/* <Box sx={{ width: '100%', height: 480, maxWidth: 1100, bgcolor: 'background.paper' }}> */}
                <Item>
               
                  <Typography
                  sx={{fontFamily:"Times New Roman" , fontSize:28,mb:1,mt:1}} 
                  >
                    Student Name
                  </Typography>
                  <Message1 socket={socket} username={username} room={room}/>
                
                </Item>
                {/* </Box> */}
              </Grid>

            </Grid>
            </Box>

        </Box>
    );
}
export default Chat;
 
