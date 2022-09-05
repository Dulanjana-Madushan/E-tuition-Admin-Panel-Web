import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { 
    Typography, 
    Button, 
    CircularProgress, 
    Card, 
    CardMedia, 
    useTheme, 
    useMediaQuery } from '@mui/material';

import useFetch from '../../services/useFetch';
import DialogAlert from '../../components/Dialog';
import dp from '../../images/dp.png';
import { base_url } from '../../Const/Const';

const TeacherProfile = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const {data, isLoading, error} = useFetch(base_url + '/auth/me');

    return (
        <Box
            display='flex'
            flexDirection='column'
            padding={2}
            sx={{mt: 6, pl:2, pr:2, width:'100%'}}
        >
            <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                paddingLeft={2}
                paddingTop={1}
                paddingBottom={1}
            >
                <Typography
                    sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}  
                >
                    My Profile
                </Typography>
            </Box>
            <Box 
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:match?'center':'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color='red'>{error}</Typography>}
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
                                        {data.photo.id && (
                                            <div>
                                                <CardMedia
                                                    component="img"
                                                    image={data.photo.webContentLink}
                                                    alt="admin"
                                                />
                                            </div>
                                        )} 
                                        {!data.photo.id && (
                                            <div>
                                                <CardMedia
                                                    component="img"
                                                    image={dp}
                                                    alt="admin"
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
                                            sx={{justifyContent:match?'center':'center'}}
                                        >
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Name</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.name}</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Email</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{jjustifyContent:match?'center':'center'}}>{data.email}</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Phone Number</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.phone}</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Gender</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.gender}</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>School / Institute</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.school}</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600}}>Qualifications</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}
                                            >
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.qualifications.substring(1, data.qualifications.length-1)}</Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:4}}
                                            >
                                                <Button variant='contained' onClick={()=>navigate('/teacher/updateprofile')} sx={{justifyContent:match?'center':'center', backgroundColor:"#3F51B5", color:'white'}}>Update</Button>
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
 
export default TeacherProfile ;

