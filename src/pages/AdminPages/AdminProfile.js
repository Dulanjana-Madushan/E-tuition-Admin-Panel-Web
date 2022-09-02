import { Box } from '@mui/system';
import { CircularProgress,} from '@mui/material';
import { Stack, Typography,useTheme, useMediaQuery,Button } from '@mui/material';
import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import Image from '../../images/profile_photo.png';
import { useNavigate } from 'react-router-dom';
import DialogAlert from '../../components/Dialog';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const AdminProfile = () => {

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const {data, isLoading, error} = useFetch(base_url + '/auth/me');
    console.log(data);
    const navigate = useNavigate();

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
                //sx={{justifyContent:'center',backgroundColor:'#F2F2F2',border:1, borderColor:'#E0E0E0',borderRadius: 2}}
            >
                <Typography
                    sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}  
 
                >
                    Admin Profile
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
                                
                                {data.photo.webContentLink && (
                                                                        <div>
                                                                            <CardMedia
                                                                                component="img"
                                                                                image={data.photo.webContentLink}
                                                                                alt="admin"
                                                                            />
                                                                        </div>
                                                                    )} 
                                {!data.photo.webContentLink && (
                                                                        <div>
                                                                            <CardMedia
                                                                                component="img"
                                                                                image={Image}
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
                                        sx={{justifyContent:match?'center':'center', mt:8}}
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
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.name}</Typography>
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
                                                <Typography sx={{jjustifyContent:match?'center':'center'}}>{data.email}</Typography>
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
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.phone}</Typography>
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
                                                <Typography sx={{justifyContent:match?'center':'center'}}>{data.gender}</Typography>
                                            </Box>

                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                //backgroundColor="#EDf5E1"
                                            
                                                sx={{justifyContent:match?'center':'center'}}
                                                >
                                                    <Stack direction={{ xs: 'column', sm: 'row' }}
                                                    spacing={{ xs: 1, sm: 2, md: 4 }}>
                                                        {!isLoading && <Button  type="submit" variant="contained" sx={{ mt: 1, mb: 1 ,backgroundColor: '#3F51B5'}}
                                                        onClick={()=>{
                                                            navigate("/admin/profileedit")
                                                            }}>
                                                            Update
                                                        </Button>}
                                                        
                                                    </Stack>
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
 
export default AdminProfile ;

