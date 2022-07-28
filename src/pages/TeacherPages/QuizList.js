import { useHistory, useParams } from 'react-router-dom';

import { Box } from '@mui/system';
import { Typography, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';

const QuizList = () => {

    const history = useHistory();
    const {subjectid} = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/quiz');
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
                sx={{justifyContent:'center',backgroundColor:'#D9DDDC'}}
            >
            <Typography
                sx={{fontFamily:"Times New Roman" , fontSize
                :30,}}
            >
                Quiz List
            </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'right'}}
            >
                <Button variant="contained" startIcon={<AddIcon />} onClick={()=>{history.push("/subjects/" + subjectid + "/createquiz");}}
                >
                    Create Quiz
                </Button>          
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="success" />}
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                sx={{width: '100%', mt:2}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <Box sx={{backgroundColor:'#EDF5E1', pl:1, pr:1,}}>
                        <Typography variant='body2'>
                                Created At : {item.createdAt}
                            </Typography>
                            <Typography variant='h6'>
                                Title : {item.title}
                            </Typography>
                            <Typography>
                                Duration : {item.duration} mins
                            </Typography>
                            <Button 
                                size='small'
                                color="success"
                                variant="contained"
                                sx={{mb:1}}
                                onClick={()=>{history.push("/quiz/" + item._id);}}
                            >
                                Update
                            </Button>
                        </Box>
                    </div>
                ))}
            </Box>
        </Box>
    );
}
 
export default QuizList;