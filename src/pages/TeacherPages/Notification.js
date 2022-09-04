import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
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
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

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
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    // const [openx, setOpenx] = useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState([]);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(event);
      console.log(index);
      console.log(event);
    }

    // const handleClickOpen = () => {
    //     setOpenx(true);
    // };

    // const handleClose = () => {
    //     setOpenx(false);
    // };

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
        <ListItem style={{height:'70'}} key={index} component="div" >
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

            <Box style = {{backgroundColor:'#FFFFFF'}}> 
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
                      <div>
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

            {/* Details of  Notification */}
            <Grid item xs={9}>
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
                    sx={{justifyContent:'center',backgroundColor:'#D9DDDC',borderRadius: 5}}
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

                <Box margin = {1}>
                  <div
                      style={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'center',
                        height: '100vh',
                      }}
                    >

                  <Card 
                    sx={{width:match?700:700,height:match?300:300 ,textAlign:"center", Position:"center"}} 
                  >
                    <CardActionArea sx={{width:match?700:700,height:match?300:300}}>
                      <CardContent>
                        
                        <Typography variant="h6" component="div">
                          <h4>{selectedIndex.title}</h4>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <p>{selectedIndex.description}</p>
                        </Typography>
                        <Typography variant="body3" color="text.secondary">
                          <p>{selectedIndex.time}</p>
                        </Typography>
                        
                      </CardContent>
                    </CardActionArea>  
                  </Card> 
                  </div>
                </Box>   
              </Box>         
            </Grid>
            </Grid>
           </Box>
          </Box>  
    );
  }

export default TNotification;

