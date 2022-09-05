import { useNavigate, useParams, Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Avatar, CircularProgress, Rating, Typography } from '@mui/material';

import DialogAlert from '../../components/Dialog';
import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import { useState, useEffect } from "react"

const Review = () => {

    const {subjectid} = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid);
    console.log(data);
    //console.log(data.averageRating);

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

    },[base_url + '/subjects/' + subjectid + '/reviews'])
    return (
        <Box 
            display='flex'
            flexDirection='column'
            sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
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
                    Reviews
                </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
                {data && data.length === 0 && <p>No Reviews</p>}
            </Box>
            
            <Box
                        sx={{mb:2,justifyContent:'center',}}
                    >
                        {data && <div>
                        <Box>
                            <Box
                            sx={{alignItems:'center', border:1, borderColor:'#E0E0E0', borderRadius:2}}>
                            {/* Ratings */}
                            {data && data.length !== 0 && <div>
                            <Box
                                        display='flex'
                                        flexWrap="wrap"
                                        flexDirection='row'
                                        sx={{justifyContent:'center', mt:1}}
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
                                            {data.averageRating}/5.0
                                        </Typography>  
                            </Box>

                            <Box
                                        display='flex'
                                        flexWrap="wrap"
                                        flexDirection='row'
                                        sx={{justifyContent:'center', mt:1}}
                                    >
                                        <Rating value={data.averageRating} precision={0.5} readOnly />
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

            {/* {data && data.length != 0 && <div>
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
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'center', mt:1}}
            >
                <Typography sx={{fontWeight:'bold'}}>
                    3.0/5.0
                </Typography>  
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                sx={{width: '100%', mt:2}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <Box 
                            display='flex'
                            flexWrap="wrap"
                            flexDirection='row'
                            sx={{backgroundColor:'#f2cafe', pl:1, pr:1, mt:1, alignItems:'center', border:1, borderColor:'#E0E0E0', borderRadius:2}}
                        >
                            <Avatar alt="logo" src={profile}/>
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
            </div>} */}
        </Box>
    );
}
 
export default Review;