import { useHistory, useParams, Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Typography, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import pdf from '../../images/pdf_icon.png';
import quiz from '../../images/quiz.png';

const Lms = () => {

    const history = useHistory();
    const {subjectid} = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/lms');

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
                Class Notes
            </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'right', mt:1}}
            >
                <Button variant="contained" startIcon={<AddIcon />} onClick={()=>{history.push("/subjects/" + subjectid + "/createquiz");}}
                >
                    Create New
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
                        <Box sx={{backgroundColor:'#EDF5E1', pl:1, pr:1, mt:1}}>
                            <Typography variant='h6' sx={{textDecoration:'underline'}}>
                                {item.title}
                            </Typography>
                            <Box 
                                sx={{pl:3,}}
                            >
                                {item.content && item.content.map((content) => (
                                    <div key={content._id}>
                                        <Box sx={{pt:1,}}></Box>
                                        {content.uploadType === 'classNotes' && 
                                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                                                <img src={pdf} width={20}/><Box sx={{pr:1,}}></Box>
                                                <a href = {content.document.webViewLink} target={"_blank"} variant='body1'>{content.document.name}</a>
                                            </Box>}
                                        {content.uploadType === 'assignments' && 
                                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                                                <img src={pdf} width={20}/><Box sx={{pr:1,}}></Box>
                                                <a href = {content.document.webViewLink} target={"_blank"} variant='body1'>{content.document.name}</a>
                                            </Box>}
                                        {content.uploadType === 'quizezz' && 
                                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                                                <img src={quiz} width={20}/><Box sx={{pr:1,}}></Box>
                                                <Link to={`/quiz/${content.quiz}`} variant='body1'>{content.name}</Link>
                                            </Box>}
                                    </div>
                                ))}
                            </Box>
                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'end'}}>
                                <Button 
                                    size='small'
                                    color="success"
                                    variant="contained"
                                    sx={{mb:1, mt:1}}
                                    onClick={()=>{history.push("/quiz/" + item._id);}}
                                >
                                    Add Documents
                                </Button>
                            </Box>
                        </Box>
                    </div>
                ))}
            </Box>
        </Box>
    );
}
 
export default Lms;