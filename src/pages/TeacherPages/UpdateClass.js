import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';
import { 
    TextField, 
    Button, 
    IconButton, 
    MenuItem, 
    Typography, 
    useMediaQuery,
    CircularProgress, 
    useTheme } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import DialogAlert from '../../components/Dialog';
import {
    base_url, 
    streams, 
    subjects, 
    types, 
    med, 
    days } from '../../Const/Const';

const UpdateClass = () => {

    const ref = useRef();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const { subjectid } = useParams();

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [stream, setStream] = useState(streams[0]);
    const [subject, setSubject] = useState(subjects[stream][0]);
    const [type, setType] = useState(types[0]);
    const [medium, setMedium] = useState(med[0]);
    const [subtopic, setSubtopic] = useState();
    const [description, setDescription] = useState();
    const [fee, setFee] = useState();
    const [payDate, setPayDate] = useState();
    const [maxStudents, setMaxStudents] = useState();
    const [day, setDay] = useState(days[0]);
    const [time, setTime] = useState(dayjs());

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/subjects/' + subjectid , {
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

    },[])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("post", selectedFile);
        formData.append("stream", stream);
        formData.append("subject", subject);
        formData.append("subtopic", subtopic == null ? '' : subtopic);
        formData.append("type", type);
        formData.append("medium", medium);
        formData.append("description", description);
        formData.append("fee", fee);
        formData.append("payDate", payDate);
        formData.append("maxStudents", maxStudents);
        formData.append("day", day);
        formData.append("time", time)
        
        setIsLoading(true);
        setError(null);
        fetch(base_url+'/subjects', {
            method: 'POST',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')
            },
            body:formData
        }).then(res=>{
            setIsLoading(true);
            return res.json();
        })
        .then(data=>{
            setIsLoading(false);
            if(!data['success']){
                setError(data['error']);
            }else{
                navigate('/teacher');
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
            sx={{mt: 6, pl:2, pr:2, width:'100%'}}
        >
            <Box
                marginTop = {2}
                display='flex'
                flexWrap="wrap"
            >
                <Typography
                    sx={{fontSize:30, mb:1, mt:1}} 
                >
                    Update Class
                </Typography>
            </Box>
            <Box
                display='flex'
                width='100%'
                flexDirection='row'
                sx={{justifyContent:'center', mt:2}}
            >
                <Box 
                    display='flex'
                    flexWrap="wrap"
                    flexDirection='column'
                    // padding={1}
                    // sx={{justifyContent:'start', border:1, borderColor:'#cfd8dc', borderRadius:1}}
                >
                    <div>
                        {selectedFile &&(
                            <div>
                                <img alt="not found" width={"100px"} src={URL.createObjectURL(selectedFile)} />
                                <br />
                                <button onClick={()=>{
                                    ref.current.value = null;
                                    setSelectedFile(null)}}>Remove</button>
                                <br/><br/>
                            </div>
                        )}
                        <label htmlFor="icon-button-file">
                            <input
                                accept="image/*"
                                type="file"
                                name="poster"
                                style={{display:"none"}}
                                ref={ref}
                                onChange={(event) => {
                                    setSelectedFile(event.target.files[0]);
                                }}
                            />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera/>
                            </IconButton>
                        </label>
                        </div>
                    </Box>
                <Box
                    display='flex'
                    component="main"
                    flexDirection='column'
                    width={match?'100%':'50%'}
                    sx={{justifyContent:'center',border:2, borderColor:'gray', borderRadius:2, padding: 2, mb:4}}
                >
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            required
                            id="stream"
                            label="Stream" 
                            name='stream'
                            margin='normal'
                            size='small'
                            fullWidth
                            select
                            value={stream}
                            onChange={e => setStream(e.target.value)}
                        >
                            {streams.map((option) => (
                                <MenuItem value={option}>{option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            required
                            id="subject"
                            label="Subject" 
                            name='subject'
                            margin='normal'
                            size='small'
                            fullWidth
                            select
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        >
                            {subjects[stream].map((option) => (
                                <MenuItem value={option}>{option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            required
                            id="type"
                            label="Type" 
                            name='type'
                            margin='normal'
                            size='small'
                            fullWidth
                            select
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            {types.map((option) => (
                                <MenuItem value={option}>{option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            required
                            id="medium"
                            label="Medium" 
                            name='medium'
                            margin='normal'
                            size='small'
                            fullWidth
                            select
                            value={medium}
                            onChange={e => setMedium(e.target.value)}
                        >
                            {med.map((option) => (
                                <MenuItem value={option}>{option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            id="subtopic"
                            label="Subtopic"
                            name='subtopic'
                            margin='normal'
                            size='small'
                            fullWidth
                            value={subtopic}
                            onChange={e => setSubtopic(e.target.value)}
                        />
                        <TextField
                            required
                            id="description"
                            label="Description"
                            name="description"
                            margin="normal"
                            size='small'
                            fullWidth
                            multiline={true}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TextField
                            required
                            id="fee"
                            label="Class Fee"
                            name="fee"
                            margin="normal"
                            size='small'
                            type='number'
                            fullWidth
                            onChange={e => setFee(e.target.value)}
                        />
                        <Box
                            display='flex'
                            width='100%'
                            flexDirection={useMediaQuery(theme.breakpoints.up("md"))?'row':'column'}
                        >
                            <TextField
                                required
                                id="day"
                                label="Day"
                                name="day"
                                margin="normal"
                                size='small'
                                fullWidth
                                select
                                value={day}
                                onChange={e => setDay(e.target.value)}
                            >
                                {days.map((option) => (
                                    <MenuItem value={option}>{option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box marginX={1}></Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Class time"
                                    value={time}
                                    onChange={(newValue) => {
                                    setTime(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} size='small' fullWidth margin='normal' />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            display='flex'
                            width='100%'
                            flexDirection={useMediaQuery(theme.breakpoints.up("md"))?'row':'column'}
                        >
                            <TextField
                                required
                                id="payDate"
                                label="Payment Date"
                                name="payDate"
                                margin="normal"
                                size='small'
                                type='number'
                                InputProps={{ inputProps: { min: 1, max: 28 } }}
                                helperText="Enter the day of the month when the class fee is to be paid (1-28)"
                                fullWidth
                                value={payDate}
                                onChange={e => setPayDate(e.target.value)}
                            />   
                            <Box marginX={1}></Box>
                            <TextField
                                required
                                id="maxStdudents"
                                label="Max Students"
                                name="maxStudents"
                                margin="normal"
                                size='small'
                                type='number'
                                fullWidth
                                value={maxStudents}
                                onChange={e => setMaxStudents(e.target.value)}
                            />
                        </Box>
                        <p>Add a class poster<br/>File should be *.jpg, *.png</p>
                        <Box 
                            display='flex'
                            flexWrap="wrap"
                            flexDirection='column'
                            padding={1}
                            sx={{justifyContent:'start', border:1, borderColor:'#cfd8dc', borderRadius:1}}
                        >
                            <div>
                                {selectedFile && selectedFile.type == 'image/jpeg' &&(
                                    <div>
                                        <img alt="not fount" width={"100px"} src={URL.createObjectURL(selectedFile)} />
                                        <br />
                                        <button onClick={()=>{
                                            ref.current.value = null;
                                            setSelectedFile(null)}}>Remove</button>
                                        <br/><br/>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="poster"
                                    ref={ref}
                                    onChange={(event) => {
                                        setSelectedFile(event.target.files[0]);
                                    }}
                                />
                                </div>
                                {selectedFile && selectedFile.type != 'image/jpeg' &&(
                                    <Box
                                        display='flex'
                                        flexWrap="wrap"
                                        sx={{justifyContent:'end'}}
                                    >
                                        <Button sx={{color:'red'}} size='small' onClick={()=>{
                                            ref.current.value = null;
                                            setSelectedFile(null)}}>Remove</Button>
                                    </Box>
                                )}
                        </Box>
                        <Box
                            display='flex'
                            flexWrap="wrap"
                            flexDirection='row'
                            sx={{justifyContent:'center', mt:1}}
                        >
                            {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                            {error && <Typography color='red'>{error}</Typography>}
                            {isLoading && <CircularProgress />}
                            <Button variant="contained"  type="submit"
                                sx={{ mt: 3, mb: 2,backgroundColor:"#4b0082",color:"white" }}
                            >
                                Create
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}
 
export default UpdateClass;

