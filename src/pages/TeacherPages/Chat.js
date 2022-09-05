import { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import { 
  Typography, 
  CircularProgress, 
  ListItem,
  ListItemButton,
  Divider,
  Grid,
  Paper,
  styled,
  useTheme,
  useMediaQuery } from '@mui/material';

//  import { FixedSizeList } from 'react-window';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { makeStyles } from '@mui/styles';
import Message1 from './Message1';
import io from "socket.io-client";
import { CenterFocusStrong } from '@mui/icons-material';
import { base_url } from '../../Const/Const';
 

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Chat = () => {
  // useEffect(() => {
    // const userSocket = io(base_url + '/msges', {auth: localStorage.getItem('token')});
    // userSocket.on('connect', () => {
    //   console.log('connected');
    // });
    // userSocket.on('connect_error', (error) => {
    //   console.log(error);
    // });
  // },[]);

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

    

  // console.log(data)
  
 
 
 
   
 
  function renderRow(props) {
    const { index, style } = props;
  
    return (
      
      <ListItem style={style} key={index} component="div" disablePadding >
        <ListItemButton>
          
          <ListItemAvatar>
                <Avatar
                  // alt={`Avatar n°${value + 1}`}
                  // src={`/src/images/avatar/${value + 1}.jpg`}
                  
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
        );}

    // return (  
    //     <Box
    //         display='flex'
    //         flexDirection='column'
    //         sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
    //     >
    //          <Box
    //             marginTop = {2}
    //             marginBottom = {2}
    //             display='flex'
    //             flexWrap="wrap"
    //             paddingLeft={2}
    //             paddingTop={1}
    //             paddingBottom={1}
    //            //sx={{justifyContent:'center',backgroundColor:'#F2F2F2',border:1, borderColor:'#E0E0E0',borderRadius: 2}}
                
    //         >
    //         <Typography
    //          sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}} 
    //         >
    //           My chats
    //         </Typography>
    //         </Box>
    //     </Box>
    // );
  

  return (  
      <Box
        display='flex'
        flexDirection='column'
        padding={2}
        sx={{mt: 6, pl:2, pr:2, width:'100%'}}
      >
          <Box
              marginTop = {2}
              marginBottom={2}
              display='flex'
              flexWrap="wrap"
              paddingLeft={2}
              paddingTop={1}
              paddingBottom={1}
          >
          <Typography
            sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}  
          >
            My Chats
          </Typography>
          </Box>
          <Box
              display='flex'
              flexWrap="wrap"
              flexDirection='row'
              sx={{justifyContent:match?'center':'center',backgroundColor:'white'}}
          >
            <Box sx={{justifyContent:match?'center':'center',width:match?'85vw':450,height:"70vh", display: 'flex', boxShadow: 0,border:1,borderRadius:2, m:1}}> 
            <Typography
                sx={{fontFamily:"Times New Roman" , fontSize:28,mb:1,mt:1, alignItems: "center"}} 
            >
                Contacts
            </Typography>
            </Box>
            <Box sx={{justifyContent:match?'center':'center',width:match?'85vw':450,height:"70vh", display: 'flex', boxShadow: 0,border:1,borderRadius:2, m:1}}> 
            <Typography
                sx={{fontFamily:"Times New Roman" , fontSize:28,mb:1,mt:1, alignItems: "center"}} 
            >
                Chat
            </Typography>
            </Box>
          {/* <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item sm={4}>
              
              <Item>
                <Box sx={{ width: '100%', height: 480, maxWidth: 360, bgcolor: 'background.paper' }}> */}
                {/* <FixedSizeList
                  height={480}
                  width={300}
                  itemSize={46}
                  itemCount={20}
                  overscanCount={5}
                >
                  {renderRow}
                </FixedSizeList> */}
              {/* </Box>
              </Item>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item sm={6} > */}
              {/* <Box sx={{ width: '100%', height: 480, maxWidth: 1100, bgcolor: 'background.paper' }}> */}
              {/* <Item>
                <Typography
                sx={{fontFamily:"Times New Roman" , fontSize:28,mb:1,mt:1}} 
                >
                  Student Name
                </Typography> */}
                {/* <Message1 socket={userSocket} username={username} room={room}/> */}
              
              {/* </Item> */}
              {/* </Box> */}
            {/* </Grid>

          </Grid> */}
          </Box>
 
 
         </Box>
     );
 }
 export default Chat;