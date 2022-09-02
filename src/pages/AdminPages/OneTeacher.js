import { useParams} from 'react-router-dom';
import { Box } from '@mui/system';
import { CircularProgress} from '@mui/material';
import { useState } from 'react';
import { Typography,useTheme, useMediaQuery } from '@mui/material';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';

const OneTeacher = () => {

    const theme = useTheme();
    const { userid } = useParams();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const {data, isLoading, error} = useFetch(base_url + '/users/' + userid);
    const navigate = useNavigate();
    console.log(data);

    return (
        <Box
            display='flex'
            flexDirection='column'
            padding={2}
            sx={{mt: 6, pl:2, pr:2, width:'100%'}}
        >
            <Box
                 marginTop = {3}
                 marginBottom = {2}
                 display='flex'
                 flexWrap="wrap"
                 paddingLeft={2}
                 ppaddingTop={1}
                 paddingBottom={1}
                //sx={{justifyContent:'center',backgroundColor:'#F2F2F2',border:1, borderColor:'#E0E0E0',borderRadius: 2}}
            >
                <Typography
                    sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}  
 
                >
                    Teacher Details
                </Typography>

            </Box>

            <Box 
            display='flex'
            flexWrap="wrap"
            sx={{justifyContent:match?'center':'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
                <Box 
                    display='flex'
                    flexDirection='column'
                    sx={{width:'100%'}}
                >
                    {data && <div>
                        <Box
                        display='flex'
                        flexWrap="wrap"
                        flexDirection='row'
                        sx={{justifyContent:match?'center':'center',backgroundColor:'white'}}
                        >

                        <Box  sx={{ m:1}}>
                            <Card 
                            sx={{justifyContent:match?'center':'center',width:match?'85vw':450,height:match?400:400, display: 'flex',backgroundColor:'#c6cbec', boxShadow: 0,border:0,borderRadius:2}}
                            >
                                {isLoading && <CircularProgress color="primary" />}
                                {data && <div>
                                
                                {data.user.photo.webContentLink && (
                                                                        <div>
                                                                            <CardMedia
                                                                                component="img"
                                                                                //height="140"
                                                                                image={data.user.photo.webContentLink}
                                                                                alt="teacher"
                                                                            />
                                                                        </div>
                                                                    )} 
                                {!data.user.photo.webContentLink && (
                                                                        <div>
                                                                            <CardMedia
                                                                                component="img"
                                                                                //height="140"
                                                                                image={Image}
                                                                                alt="teacher"
                                                                            />
                                                                        </div>
                                                                    )}
                                
                                
                                </div>}
                           
                            </Card>   
                        </Box> 

                            <Box  sx={{ m:1}}>
                                <Card sx={{justifyContent:match?'center':'center',width:match?'85vw':450,height:match?400:400, display: 'flex',backgroundColor:'#c6cbec', boxShadow: 0,border:0,borderRadius:2}}  >
                                    <Box  sx={{ m:1}}>
                                        <Box
                                        flexDirection='row'
                                        sx={{justifyContent:match?'center':'center', mt:5}}
                                        >
                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Name</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.user.name}</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Email</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{jjustifyContent:match?'center':'center'}}>{data.user.email}</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Phone Number</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.user.phone}</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Qualifications</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.user.qualifications.substring(1,data.user.qualifications.length-1)}</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Gender</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.user.gender}</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>School</Typography>
                                            </Box>

                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.user.school}</Typography>
                                            </Box>
                        
                                        </Box>
                                    </Box>
                            
                                </Card>   
                            </Box> 
                        </Box>
                    </div>}
                </Box>
            </Box>
        </Box>
    );
}
 
export default OneTeacher ;