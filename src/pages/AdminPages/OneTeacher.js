import { useParams} from 'react-router-dom';
import { Box } from '@mui/system';
import { CircularProgress} from '@mui/material';
import { useState, useEffect } from 'react';
import { Typography, Button, useTheme, useMediaQuery } from '@mui/material';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import dp from '../../images/dp.png';

const OneTeacher = () => {

    const theme = useTheme();
    const { userid } = useParams();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [updated, setUpdated] = useState(false);
    console.log(data);

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/users/' + userid, {
            method: 'GET',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')}},
        )
            .then(res =>{
                return res.json();
            })
            .then(data => {
                if(data['success']){
                    setData(data['data']);
                }else{
                    setError(data['error'])
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

            return () => abortCont.abort();

    },[updated])

    const verify = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        fetch(base_url+'/admin/' + userid + '/verify', {
            method: 'PUT',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')
            },
        }).then(res=>{
            setIsLoading(true);
            return res.json();
        })
        .then(data=>{
            setIsLoading(false);
            if(!data['success']){
                setError(data['error']);
            }else{
                setUpdated(!updated);
            }
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('Fetch aborted');
            }else{
                setIsLoading(false);
                setError(err.message);
            }
        })  
    }

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
                                sx={{justifyContent:match?'center':'center',width:match?'85vw':450,height:match?"85vw":400, display: 'flex',backgroundColor:'#c6cbec', boxShadow: 0,border:0,borderTopLeftRadius:50,borderBottomRightRadius:50}}
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
                                                                                image={dp}
                                                                                alt="teacher"
                                                                            />
                                                                        </div>
                                                                    )}
                                
                                
                                </div>}
                           
                            </Card>   
                        </Box> 
                            <Box  sx={{ m:1}}>
                                <Card sx={{justifyContent:match?'center':'center',width:match?'85vw':450,height:match?400:400, display: 'flex',backgroundColor:'#c6cbec', boxShadow: 0,border:0,borderBottomLeftRadius:50,borderTopRightRadius:50}}  >
                                    <Box  sx={{ m:1}}>
                                        <Box
                                        flexDirection='row'
                                        sx={{justifyContent:match?'center':'center'}}
                                        >
                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:0}}>
                                                <Button 
                                                    onClick={data.user.isPending? ()=>{verify()}:()=>{}}
                                                    sx={{justifyContent:match?'center':'center',fontSize:18,fontWeight:600, color:data.user.isPending?'red':'blue'}}
                                                >
                                                    {!data.user.isPending?'Verified':'Verify'}
                                                </Button>
                                            </Box>
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
                                            <Box
                                                    display='flex'
                                                    flexWrap="wrap"
                                                    flexDirection='row'
                                                    sx={{justifyContent:match?'center':'center', mt:2}}>
                                                    <PictureAsPdfIcon/><Box sx={{pr:1}}></Box>
                                                    <a href = {data.user.verification.webViewLink} target={"_blank"} variant='body1'>Proofs</a>
                                                        
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