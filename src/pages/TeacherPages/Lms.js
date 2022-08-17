import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { Box } from '@mui/system';
import { 
    Typography, 
    Button, 
    CircularProgress, 
    TextField,
    Container } from '@mui/material';

import { base_url } from '../../Const/Const';
import pdf from '../../images/pdf_icon.png';
import quiz from '../../images/quiz.png';

const Lms = () => {
    const navigate = useNavigate();
    const {subjectid} = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/subjects/' + subjectid + '/lms', {
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

    
    const handleSubmit = (event) => {

        event.preventDefault();
        const body = JSON.stringify({
            title: title,
            description: description,
          });
   
        setIsLoading(true);
        setError(null);
        fetch(base_url+'/subjects/' + subjectid + '/lms', {
            method: 'POST',
            headers: {"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body:body
        }).then(res=>{
        setIsLoading(true);
        return res.json();
        })
        .then(data=>{
            setIsLoading(false);
            if(!data['success']){
                setError(data['error']);
                return;
            }
            setTitle(null);
            setDescription(null);
            setUpdated(!updated);
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
            sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
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
                Class Notes
            </Typography>
            </Box>
            <Container component="main" maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        size='small'
                        autoComplete="title"
                        name="title"
                        fullWidth
                        id="title"
                        label="Title"
                        margin="normal"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        size='small'
                        autoComplete="description"
                        name="description"
                        fullWidth
                        id="description"
                        label="Description"
                        margin="dense"
                        multiline={true}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Box
                        display='flex'
                        flexWrap="wrap"
                        flexDirection='row'
                        sx={{justifyContent:'right', mt:1}}
                    >
                        <Button variant="contained"  type="submit"
                        sx={{backgroundColor:"green",color:"white"}}>
                            Add
                        </Button>          
                    </Box>
                </form>
            </Container>
            
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
                        <Box sx={{backgroundColor:'#f2cafe', pl:1, pr:1, mt:1,borderRadius: 2}}>
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
                                    variant="contained"
                                    sx={{mb:1, mt:1,backgroundColor:"#4b0082",color:"white"}}
                                    onClick={()=>{navigate("/quiz/" + item._id);}}
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