import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import useMediaQuery from '@mui/material/useMediaQuery';
import { 
    Button, 
    Typography, 
    CircularProgress, 
    Rating, 
    Avatar, 
    useTheme} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';
import useFetch from '../../services/useFetch';

const ClassDetails = () => {   
    const { subjectid } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid);
    
    const [dataa, setDataa] = useState(null);
    const [isLoadingg, setIsLoadingg] = useState(true);
    const [errorr, setErrorr] = useState(null);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(base_url + '/subjects/' + subjectid + '/reviews', {
            method: 'GET',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')}},
        {signal:abortCont.signal})
            .then(res =>{
                return res.json();
            })
            .then(data => {
                if(data['success']){
                    setDataa(data['data']);
                }else{
                    setErrorr(data['error'])
                }
                setIsLoadingg(false);
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    setErrorr('Fetch aborted');
                }else{
                    setIsLoadingg(false);
                    setErrorr(err.message);
                }
            })

            return () => abortCont.abort();

    },[])

    return (
        <Box
        display='flex'
        flexDirection='column'
        sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
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
                    Class Details
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
                                sx={{pt:2,justifyContent:match?'center':'center',width:match?'85vw':450,height:match?400:400, display: 'flex',backgroundColor:'#c6cbec', boxShadow: 0,border:0,borderRadius:2}}
                                >
                                <Box
                                    display='flex'
                                    flexWrap="wrap"
                                    sx={{justifyContent:match?'center':'center'}}
                                >
                                    {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                                    {error && <Typography color='red'>{error}</Typography>}
                                    {isLoading && <CircularProgress color="primary" />}
                                    {data && <div>
                                        <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            sx={{justifyContent:'center'}}
                                        >
                                            {data.subject.teacher.photo.webContentLink && (
                                                                            <div>
                                                                                <img alt="profile" height="250px" src={data.subject.teacher.photo.webContentLink}/>
                                                                            </div>
                                                                        )} 
                                            {!data.subject.teacher.photo.webContentLink && (
                                                                            <div>
                                                                                <img alt="profile" height="250px" src={Image}/>
                                                                            </div>
                                                                        )}
                                        </Box>
                                        
                                        <Box
                                        flexDirection='row'
                                        sx={{justifyContent:'center', mt:2}}
                                        >
                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:'center', mt:0}}>
                                                <Typography sx={{justifyContent:'center'}}>{data.subject.teacher.title +" "+data.subject.teacher.name}</Typography>
                                            </Box>

                                        
                                            <Box
                                            display='flex'
                                            flexWrap="wrap"
                                            flexDirection='row'
                                            sx={{justifyContent:'center', mt:0}}>
                                                <Typography sx={{justifyContent:'center'}}>{data.subject.teacher.email}</Typography>
                                            </Box>
                                        

                                            <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:'center', mt:1}}>
                                                
                                                <Button variant="contained" 
                                                    onClick={()=>{
                                                    navigate("/admin/adminteacherdetails/"+data.subject.teacher._id)
                                                    }}
                                                    sx={{backgroundColor:"#3F51B5",color:"white"}}>
                                                        Profile
                                                    </Button>        
                                            </Box>
                                            
                                        </Box>
                                    </div>}
                                </Box>
                                </Card>   
                            </Box> 

                            <Box  sx={{ m:1}}>
                                    <Card sx={{pt:1,pb:1,justifyContent:match?'center':'center',width:match?'85vw':450,height:match?400:400, display: 'flex',backgroundColor:'#c6cbec', boxShadow: 0,border:0,borderRadius:2}}  >
                                        <Box  sx={{ m:1}}>
                                            <Box
                                            flexDirection='row'
                                            sx={{justifyContent:match?'center':'center', mt:10}}
                                            >
                                                {/* <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}>
                                                    <Typography sx={{justifyContent:match?'center':'center'}}>{data.subject.description}</Typography>
                                                </Box> */}

                                                <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}>
                                                    <Typography sx={{justifyContent:match?'center':'center'}}>Stream: {data.subject.stream}</Typography>
                                                </Box>

                                                <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}>
                                                    <Typography sx={{jjustifyContent:match?'center':'center'}}>Class Type: {data.subject.type}</Typography>
                                                </Box>

                                                <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}>
                                                    <Typography sx={{justifyContent:match?'center':'center'}}>Medium: {data.subject.medium}</Typography>
                                                </Box>

                                                <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}>
                                                    <Typography sx={{justifyContent:match?'center':'center'}}>Date and Time: {data.subject.period.day+' '+data.subject.period.time}</Typography>
                                                </Box>

                                                <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}>
                                                    <Typography sx={{justifyContent:match?'center':'center'}}>No of Students: {data.subject.enrolledStudents.length}</Typography>
                                                </Box>

                                                <Box
                                                display='flex'
                                                flexWrap="wrap"
                                                flexDirection='row'
                                                sx={{justifyContent:match?'center':'center', mt:0}}>
                                                    <Typography sx={{justifyContent:match?'center':'center'}}>Class Fee: {data.subject.fee}</Typography>
                                                </Box>
                                            

                                                <Box
                                                    display='flex'
                                                    flexWrap="wrap"
                                                    flexDirection='row'
                                                    sx={{justifyContent:match?'center':'center', mt:5}}>
                                                    <PictureAsPdfIcon/><Box sx={{pr:1}}></Box>
                                                    <a href = {data.subject.post.webViewLink} target={"_blank"} variant='body1'>Class Post</a>
                                                        
                                                </Box>

                                                <Box
                                                    display='flex'
                                                    flexWrap="wrap"
                                                    flexDirection='row'
                                                    sx={{justifyContent:match?'center':'center', mt:5}}>
                                                    
                                                    <Button variant="contained" 
                                                        onClick={()=>{
                                                        navigate("/admin/adminpayments/"+subjectid)
                                                        }}
                                                        sx={{backgroundColor:"#3F51B5",color:"white"}}>
                                                            Payment Details
                                                        </Button> 
                                                                
                                                </Box>
                                            </Box>
                                        </Box>
                                
                                    </Card>   
                            </Box> 
                        </Box>
                    </div>}

            
                    <Box
                        sx={{mb:2,justifyContent:match?'center':'center',}}
                    >
                        {errorr && errorr === 'Token Expired' && <DialogAlert></DialogAlert>}
                        {errorr && <Typography color='red'>{errorr}</Typography>}
                        {isLoadingg && <CircularProgress color="primary" />}
                        {data && <div>
                        <Box>
                            <Box
                            sx={{alignItems:'center', border:0, borderColor:'#E0E0E0', borderRadius:2}}>
                            {/* Ratings */}
                            {data && data.length != 0 && <div>
                            <Box
                                        display='flex'
                                        flexWrap="wrap"
                                        flexDirection='row'
                                        sx={{justifyContent:match?'center':'center', mt:1}}
                                    >
                                        <Typography sx={{fontWeight:'bold'}}>
                                            Average Rating and Comments
                                        </Typography>  
                            </Box>

                            <Box
                                        display='flex'
                                        flexWrap="wrap"
                                        flexDirection='row'
                                        sx={{justifyContent:'center', mt:0}}
                                    >
                                        <Typography sx={{fontWeight:'bold'}}>
                                            {data.subject.averageRating}/5.0
                                        </Typography>  
                            </Box>

                            <Box
                                        display='flex'
                                        flexWrap="wrap"
                                        flexDirection='row'
                                        sx={{justifyContent:'center', mt:1}}
                                    >
                                        <Rating value={data.subject.averageRating} precision={0.5} readOnly />
                            </Box>

                            <Box
                                        display='flex'
                                        flexDirection='column'
                                        sx={{width: '100%', mt:2, border:0, borderColor:'#E0E0E0', borderRadius:0}}
                                    >
                                        {dataa && dataa.map((item) => (
                                            <div key={item._id}>
                                                <Box 
                                                    display='flex'
                                                    flexWrap="wrap"
                                                    flexDirection='row'
                                                    sx={{backgroundColor:'#c6cbec', pl:1, pr:1, mt:0, alignItems:'center', border:0, borderColor:'#E0E0E0', borderRadius:2}}
                                                >
                                                    <Avatar alt="logo" src={item.student.photo.webContentLink}/>
                                                    <Box sx={{pl:1}}></Box>
                                                    <Box 
                                                        display='flex'
                                                        flexDirection='column'
                                                    >
                                                        <Typography variant='subtitle2'>{item.student.name}</Typography>
                                                        <Typography variant='caption' sx={{fontStyle:'italic'}}>{item.comment}</Typography>
                                                        <Rating defaultValue={item.rating} precision={0.5} size='small' readOnly />
                                                    </Box>
                                                </Box>
                                            </div>
                                        ))}
                            </Box>
                            </div>}
                            </Box>
                        </Box>
                        </div>}
                    </Box> 
                </Box>    
            </Box>    
        </Box>
    );
}
 
export default ClassDetails ;