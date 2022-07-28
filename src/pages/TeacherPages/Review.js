import { useHistory, useParams, Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Avatar, CircularProgress, Rating, Typography } from '@mui/material';

import DialogAlert from '../../components/Dialog';
import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import profile from "../../images/john_doe.jpg";

const Review = () => {

    const {subjectid} = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/reviews');
    console.log(data)
    return (
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
                sx={{justifyContent:'center',border:'1px solid green'}}
            >
            <Typography
                sx={{fontFamily:"Times New Roman" , fontSize
                :30,}}
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
                {isLoading && <CircularProgress color="success" />}
                {data && data.length === 0 && <p>No Reviews</p>}
            </Box>
            {data && data.length != 0 && <div>
                <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'center', mt:1}}
            >
                <Rating defaultValue={3} precision={0.5} readOnly />
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
                            sx={{backgroundColor:'#EDF5E1', pl:1, pr:1, mt:1, alignItems:'center', border:1, borderColor:'#E0E0E0', borderRadius:2}}
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
            </div>}
        </Box>
    );
}
 
export default Review;