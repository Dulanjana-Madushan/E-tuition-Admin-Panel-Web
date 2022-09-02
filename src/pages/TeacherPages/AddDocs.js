import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { 
    Grid, 
    Container, 
    Box, 
    Radio, 
    RadioGroup, 
    TextField, 
    FormControlLabel, 
    FormControl, 
    Typography, 
    Button, 
    CircularProgress} from "@mui/material";

import DialogAlert from '../../components/Dialog';
import { base_url } from '../../Const/Const';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';

export default function AddDoc(props) {
    const ref = useRef();
    const navigate = useNavigate();
    const { subjectid, lmsid } = useParams();

    const [data, setData] = useState(null);
    const [Svalue, setSvalue] = useState(null);
    const [text, setText] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/subjects/' + subjectid + '/quiz', {
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

    },[Svalue])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSelectedFile(null)
        setSvalue(event.target.value);
        if(Svalue == 'quiz')handleOpen()        
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        var requestOptions;
        var url;
        if(Svalue == 'classNotes' || Svalue === "assignment" ){
            const formData = new FormData();
            formData.append("uploadType", Svalue)
            formData.append("documents", selectedFile);
            requestOptions = {
                method: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
                body: formData
            };
            url = base_url + '/lms/' + lmsid + '/lmsfiles';

        }else if(Svalue == 'quiz'){
            requestOptions = {
                method: 'POST',
                headers: {"Content-Type":"application/json", "Authorization": "Bearer " + localStorage.getItem('token')},
                body: JSON.stringify({
                    uploadType: Svalue,
                    name: quiz.title,
                    quiz: quiz._id
                })
            };
            url = base_url+'/lms/' + lmsid + '/lmsdoc';
        }else if(Svalue == 'text'){
            requestOptions = {
                method: 'POST',
                headers: {"Content-Type":"application/json", "Authorization": "Bearer " + localStorage.getItem('token')},
                body: JSON.stringify({
                    uploadType: Svalue,
                    text: text,
                }),
            };
            url = base_url+'/lms/' + lmsid + '/lmsdoc';;
        }
        
        setIsLoading(true);
        setError(null);
        fetch(url, requestOptions).then(res=>{
            setIsLoading(true);
            return res.json();
        })
        .then(data=>{
            setIsLoading(false);
            if(!data['success']){
                setError(data['error']);
                return;
            }else{
                navigate(-1);
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
        sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
    >
        <Box
            marginTop = {2}
            display='flex'
            flexWrap="wrap"
            marginBottom={2}
            sx={{justifyContent:'center',backgroundColor:'#D9DDDC', borderRadius: 2}}
        >
            <Typography
                sx={{fontSize:30,mb:1,mt:1}}
            >
                Uplaod Documents
            </Typography>
        </Box>
        <Typography sx={{fontSize:20,}} >Select class materials type</Typography>
        <Grid container direction={"row"}>
            <Grid
                sx={{
                    textAlign: "left",
                }}
            >
                <FormControl sx={{ mt: 3 }}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                    >
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="text" control={<Radio />} label="Text" onChange={handleChange} />
                        </Box>
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="classNotes" control={<Radio />} label="Class Notes" onChange={handleChange} />
                        </Box>
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="assignments" control={<Radio />} label="Assignment" onChange={handleChange} />
                        </Box>
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="quiz" control={<Radio />} label="Quiz" onChange={handleChange} />
                        </Box>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12}>
                <Box
                    sx={{
                        borderRadius: 1,
                        mt: 3,
                        mb:3
                    }}
                >
                {
                    Svalue === "classNotes" || Svalue === "assignments" 
                    ? <div>
                        <Box 
                            display='flex'
                            flexWrap="wrap"
                            padding={1}
                            sx={{justifyContent:'start', border:1, borderColor:'#cfd8dc', borderRadius:1}}
                        >
                            <div>
                                <input
                                    type="file"
                                    name="document"
                                    ref={ref}
                                    onChange={(event) => {
                                        setSelectedFile(event.target.files[0]);
                                    }}
                                />
                                {selectedFile && (
                                        <div>
                                            <br/>
                                            <Button sx={{backgroundColor:"red",color:"white"}} size='small' onClick={()=>{
                                                ref.current.value = null;
                                                setSelectedFile(null)}}>Remove</Button>
                                            <br/>
                                        </div>
                                )}
                            </div>
                        </Box>
                        {selectedFile && <Box
                            display='flex'
                            flexWrap="wrap"
                            
                            sx={{justifyContent:'center', mt:1}}
                        >
                            <Button  variant="contained" onClick={handleSubmit} sx={{backgroundColor:"green",color:"white"}}>
                                Save
                            </Button>
                        </Box>}
                    </div>
                    : <Box></Box>
                }
                {
                    Svalue === "quiz" 
                    ? <Box 
                        display='flex'
                        flexWrap="wrap"
                        flexDirection='column'
                        sx={{justifyContent:'center'}}
                    >
                        {quiz && <Container  maxWidth='sm'> 
                            <Typography>Selected Quiz : {quiz.title}</Typography>
                            <Box
                                display='flex'
                                flexWrap="wrap"
                                sx={{justifyContent:'center', mt:1}}
                            >
                                <Button  variant="contained" onClick={handleSubmit} sx={{backgroundColor:"green",color:"white"}}>
                                    Save
                                </Button>
                            </Box>
                        </Container>}
                        <Dialog onClose={handleClose} open={open}>
                            <DialogTitle>Select a Quiz</DialogTitle>
                            <List sx={{ pt: 0 }}>
                                {data.map((quiz) => (
                                    <ListItem button onClick={() => {handleClose();setQuiz(quiz)}} key={quiz._id}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#c6cbec', color: '#303f9f' }}>
                                        <AddIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                        <ListItemText primary={quiz.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Dialog>
                    </Box>    
                    : <Box></Box>
                }
                {
                    Svalue === "text" 
                    ? <Container component="main" maxWidth="sm">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                required
                                size='small'
                                autoComplete="text"
                                name="text"
                                fullWidth
                                id="text"
                                label="Text/Link"
                                margin="normal"
                                multiline={true}
                                onChange={e => setText(e.target.value)}
                            />
                            <Box
                                display='flex'
                                flexWrap="wrap"
                                flexDirection='row'
                                sx={{justifyContent:'center', mt:1}}
                            >
                                <Button  variant="contained" onClick={handleSubmit} sx={{backgroundColor:"green",color:"white"}}>
                                    Save
                                </Button>

                            </Box>
                        </form>
                    </Container>
                    : <Box></Box>
                }
                </Box>
            </Grid>
        </Grid>
        <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color="red">{error}</Typography>}
                {isLoading && <CircularProgress color="primary" />}
        </Box>
    </Box>
  );
}