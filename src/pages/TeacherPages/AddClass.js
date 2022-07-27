import * as React from 'react';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Box } from '@mui/system';
import { TextField, Button, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';

import DialogAlert from '../../components/Dialog';
import { streams, subjects, types } from '../../Const/Const';

const AddClass = () => {

    const ref = useRef();
    const theme = useTheme();
    const history = useHistory();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [stream, setStream] = useState(streams[0]);
    const [subject, setSubject] = useState(subjects[stream][0]);
    const [type, setType] = useState(types[0]);
    const [subtopic, setSubtopic] = useState();
    const [description, setDescription] = useState();
    const [fee, setFee] = useState();
    const [payDate, setPayDate] = useState();
    const [maxStudents, setMaxStudents] = useState();
    const [period, setPeriod] = useState();

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
                    sx={{fontFamily:"Times New Roman" , fontSize:30, mb:1, mt:1}} 
                >
                    Create Class
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
                    component="form"
                    flexDirection='column'
                    width={match?'100%':'50%'}
                    sx={{justifyContent:'center',border:2, borderColor:'gray', borderRadius:5, padding: 2, mb:4}}
                >
                    <TextField 
                        required
                        id="stream"
                        label="Stream" 
                        name='stream'
                        margin='normal'
                        size='small'
                        fullWidth
                        select
                        defaultValue={stream}
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
                        defaultValue={subject}
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
                        defaultValue={type}
                        onChange={e => setType(e.target.value)}
                    >
                        {types.map((option) => (
                            <MenuItem value={option}>{option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        required
                        id="subtopic"
                        label="Subtopic"
                        name='subtopic'
                        margin='normal'
                        size='small'
                        fullWidth
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
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Box
                        display='flex'
                        width='100%'
                        flexDirection={useMediaQuery(theme.breakpoints.up("md"))?'row':'column'}
                    >
                        <TextField
                            id="period"
                            label="Class Time"
                            name="period"
                            margin="normal"
                            size='small'
                            fullWidth
                            onChange={e => setPeriod(e.target.value)}
                        />
                        <Box marginX={1}></Box>
                        <TextField
                            required
                            id="payDate"
                            label="Payment Date"
                            name="payDate"
                            margin="normal"
                            size='small'
                            fullWidth
                            onChange={e => setPayDate(e.target.value)}
                        />
                    </Box>
                    <Box
                        display='flex'
                        width='100%'
                        flexDirection={useMediaQuery(theme.breakpoints.up("md"))?'row':'column'}
                    >
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
                            onChange={e => setMaxStudents(e.target.value)}
                        />
                    </Box>
                    <p>Add a class poster<br/>File should be .jpg, .png</p>
                    <Box 
                        display='flex'
                        flexWrap="wrap"
                        padding={1}
                        sx={{justifyContent:'start', border:1, borderColor:'#cfd8dc', borderRadius:1}}
                    >
                        <div>
                            {selectedImage && (
                                <div>
                                    <img alt="not fount" width={"100px"} src={URL.createObjectURL(selectedImage)} />
                                    <br />
                                    <button onClick={()=>{
                                        ref.current.value = null;
                                        setSelectedImage(null)}}>Remove</button>
                                    <br/><br/>
                                </div>
                            )}
                            <input
                                type="file"
                                name="poster"
                                ref={ref}
                                onChange={(event) => {
                                    setSelectedImage(event.target.files[0]);
                                }}
                            />
                            </div>
                    </Box>
                    {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                    {error && <div>{error}</div>}
                    {!isLoading && <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>}
                </Box>
            </Box>
        </Box>
    );
}
 
export default AddClass;

