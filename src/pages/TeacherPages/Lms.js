import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { Box } from '@mui/system';
import { 
    Typography, 
    Button, 
     TextField,
    Container, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogActions } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import NotesIcon from '@mui/icons-material/Notes';
import BeatLoader from "react-spinners/BeatLoader";

import DialogAlert from '../../components/Dialog';
import { base_url } from '../../Const/Const';

const Lms = () => {
    const navigate = useNavigate();
    const {subjectid} = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [titleUpdate, setTitleUpdate] = useState(dialogData.title);
    const [descriptionUpdate, setDescriptionUpdate] = useState(dialogData.description);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const clearForm = () => {
        setTitle(null);
        setDescription(null);
    }

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
            }else{
                clearForm();
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

    const handleUpdate = (event) => {

        event.preventDefault();
        const body = JSON.stringify({
            title: titleUpdate,
            description: descriptionUpdate,
          });
        setIsLoading(true);
        setError(null);
        fetch(base_url+'/lms/' + dialogData._id, {
            method: 'PUT',
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
            handleClose();
            setTitleUpdate(null);
            setDescriptionUpdate(null);
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

    const handleDelete = (lmsId) => {

        setIsLoading(true);
        setError(null);
        fetch(base_url+ '/lms/' + lmsId, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
           
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
            handleDeleteClose()
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
            sx={{ mt: 8,mb:1, pl:2,pr:2, width:'100%'}}  
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
                        value={title}
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
                        value={description}
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
                        sx={{backgroundColor:"#3F51B5",color:"white"}}>
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
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color="red">{error}</Typography>}
                {isLoading && <BeatLoader
                    color="#3F51B5"
                    speedMultiplier={1}
                    />
                }
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                sx={{width: '100%', mt:2}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <Box sx={{backgroundColor:"#c6cbec",border:1,borderColor:'#E0E0E0', pl:1, pr:1, mt:2,borderRadius: 2}}>
                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <Typography variant='h6' sx={{textDecoration:'underline',color:"black"}}>
                                    {item.title}
                                </Typography>
                                <Box>
                                    <Button 
                                        size='small'
                                        sx={{mb:1, mt:1, mr:5}}
                                        onClick={()=>{setDialogData(item);handleClickOpen()}}
                                    >
                                        Update
                                    </Button>
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>Update{dialogData._id}</DialogTitle>
                                        <DialogContent>
                                            <form onSubmit={handleUpdate}>
                                                <TextField
                                                    required
                                                    size="small"
                                                    margin="dense"
                                                    id="title"
                                                    label="Title"
                                                    fullWidth
                                                    variant="standard"
                                                    defaultValue={dialogData.title}
                                                    onChange={e=>setTitleUpdate(e.target.value)}
                                                />
                                                <TextField
                                                    size="small"
                                                    margin="dense"
                                                    id="description"
                                                    label="Description"
                                                    fullWidth
                                                    variant="standard"
                                                    multiline={true}
                                                    defaultValue={dialogData.description}
                                                    onChange={e=>setDescriptionUpdate(e.target.value)}
                                                />
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button type="submit">Update</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <Button 
                                        size='small'
                                        sx={{mb:1, mt:1, mr:5, color: 'red'}}
                                        onClick={handleDeleteOpen}
                                    >
                                        Delete
                                    </Button>
                                    <Dialog
                                        open={openDelete}
                                        onClose={handleDeleteClose}
                                    >
                                        <DialogTitle>
                                            Do you want to delete this?"
                                        </DialogTitle>
                                        <DialogActions>
                                        <Button onClick={()=>handleDelete(item._id)}>
                                            Yes
                                        </Button>
                                        <Button onClick={handleDeleteClose}>
                                            No
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                            </Box>
                            <Typography  sx={{color:"black"}}>
                                {item.description}
                            </Typography>
                            <Box >
                                {item.content && item.content.map((content) => (
                                    <div key={content._id}>
                                        <Box sx={{pt:1,}}></Box>
                                        {content.uploadType === 'text' && 
                                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                                                <NotesIcon/><Box sx={{pr:1,}}></Box>
                                                    <Typography variant='body2'>{content.text}</Typography>
                                            </Box>}
                                        {content.uploadType === 'classNotes' && 
                                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                                                <PictureAsPdfIcon/><Box sx={{pr:1,}}></Box>
                                                <a href = {content.document.webViewLink} target={"_blank"} variant='body1'>{content.document.name}</a>
                                            </Box>}
                                        {content.uploadType === 'assignments' && 
                                            <Box sx={{display:'flex', flexDirection:'column'}}>
                                                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                                                    <PictureAsPdfIcon/><Box sx={{pr:1,}}></Box>
                                                    <a href = {content.document.webViewLink} target={"_blank"} variant='body1'>{content.document.name}</a>
                                                </Box>
                                                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                                    <Button 
                                                        size='small'
                                                        // variant="filled"
                                                        sx={{mb:1, mt:1,}}
                                                        onClick={()=>{navigate("/teacher/subjects/" + subjectid + "/submissions/" + content._id + "/all");}}
                                                    >
                                                        View Submissions
                                                    </Button>
                                                </Box>
                                            </Box>}
                                        {content.uploadType === 'quiz' && 
                                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                                                <QuizIcon/><Box sx={{pr:1,}}></Box>
                                                <Link to={`/quiz/${content.quiz}`} variant='body1'>{content.name}</Link>
                                            </Box>}
                                    </div>
                                ))}
                            </Box>
                            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'end'}}>
                                <Button 
                                    size='small'
                                    variant="contained"
                                    sx={{mb:1, mt:1,backgroundColor:"#3F51B5",color:"white"}}
                                    onClick={()=>{navigate("/teacher/subjects/" + subjectid + "/lms/" + item._id);}}
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