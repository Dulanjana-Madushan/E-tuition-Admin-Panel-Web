import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { base_url } from '../../Const/Const';

import { Box } from '@mui/system';
import { 
    CircularProgress,
    Typography, 
    useTheme, 
    useMediaQuery } from '@mui/material';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogAlert from '../../components/Dialog';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Announcements = () => {

    const {subjectid} = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/subjects/' + subjectid + '/notification', {
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
            description: message,
          });
   
        setIsLoading(true);
        setError(null);
        fetch(base_url+'/subjects/' + subjectid + '/notification', {
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
            handleClose();
            setTitle(null);
            setMessage(null);
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

    const handleDelete = (notificationId) => {

        setIsLoading(true);
        setError(null);
        fetch(base_url+ '/notification/' + notificationId, {
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
            setTitle(null);
            setMessage(null);
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
                    Announcements
                </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'right', mb:2}}
            >
                <Button variant="contained"  onClick={handleClickOpen}
                sx={{backgroundColor:"#3F51B5",color:"white"}}>
                    Make an Announcement
                </Button>          
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Notification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Type notification title and the content
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            autoFocus
                            size="small"
                            margin="dense"
                            id="title"
                            label="Title"
                            type="title"
                            fullWidth
                            variant="standard"
                            onChange={e=>setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            size="small"
                            margin="dense"
                            id="message"
                            label="Message"
                            type="message"
                            fullWidth
                            variant="standard"
                            multiline={true}
                            onChange={e=>setMessage(e.target.value)}
                        />
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Send</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color="red">{error}</Typography>}
                {isLoading && <CircularProgress color="primary" />}
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection="column"
                sx={{justifyContent:match?'center':'start'}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <Box sx={{ mt: 2}}>
                            <Accordion sx={{backgroundColor:"#c6cbec"}}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    <Typography>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{item.description}</Typography>
                                    <Typography>{item.time.substring(0,10)}</Typography>
                                    <Button variant="contained" onClick={()=>handleDelete(item._id)}
                                    sx={{backgroundColor:"red",color:"white"}}>
                                        Delete
                                    </Button>  
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </div>
                ))}
            </Box>
        </Box>
    );
}
 
export default Announcements;