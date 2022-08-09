import { useHistory, useParams, Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Avatar, CircularProgress, Rating } from '@mui/material';
import { useState } from 'react';
import { Button, Stack, Typography, Checkbox, FormControlLabel, MenuItem, IconButton, TextField,
    useTheme, useMediaQuery, FormGroup } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';

const ClassDetails = () => {

    const theme = useTheme();
    const {subjectid} = useParams();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedImage, setSelectedImage] = useState(null);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);
    const [maxStudents, setMax] = useState(null);
    const [type, setType] = useState(null);
    const [fee, setFee] = useState(null);
    const [stream, setStream] = useState(null);

    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid);
    console.log(data);

    return (
        <Box
            display='flex'
            flexDirection='column'
            padding={2}
            sx={{mt: 6, pl:2, pr:2, width:'100%'}}
        >
            <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                //backgroundColor="#EDf5e1"
                paddingLeft={2}
                paddingBottom={2}
               sx={{justifyContent:'center',backgroundColor:'#D9DDDC',borderRadius: 2}}
            >
                <Typography
                    sx={{fontFamily:"Times New Roman" , fontSize:30, mb:1, mt:1}} 
                >
                    Class Details
                </Typography>

            </Box>
            {isLoading && <CircularProgress color="success" />}
            {data && <div>
                <Box
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center'}}
                >

                                    <div>
                                        <img alt="class post" height="250px" src={data.subject.post.webContentLink}/>
                                    </div>  
                    {/* {!selectedImage && (
                                    <div>
                                        <img alt="profile" height="250px" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU'/>
                                    </div>
                                )}
                    {selectedImage && (
                                    <div>
                                        <img alt="profile" height="250px" src={URL.createObjectURL(selectedImage)} />
                                        <br />
                                        <button onClick={()=>{
                                            // ref.current.value = null;
                                            setSelectedImage(null)}}>Remove</button>
                                        <br/><br/>
                                    </div>
                                )} */}
                </Box>

                <Box
                    display='flex'
                    flexWrap="wrap"
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 1, width: '50ch'},justifyContent:'center'}}
                >
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField 
                            id="subject"
                            label="Subject" 
                            name="subject"
                            size='small'
                            defaultValue={data.subject.subject}
                            onChange={e => setSubject(e.target.value)}
                        />
        
                        <TextField
                            id="description"
                            label="Description"
                            name="descrption"
                            size='small'
                            defaultValue={data.subject.teacher.title +" "+data.subject.teacher.name}
                            onChange={e => setDescription(e.target.value)}/>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField
                            id='type'
                            label="Class Type" 
                            name="type"
                            size='small'
                            defaultValue={data.subject.type}
                            onChange={e => setType(e.target.value)}
                        />
                        <TextField
                            id='maxStudents'
                            label="Maximum Students" 
                            name="maxStudents"
                            size='small'
                            defaultValue={data.subject.maxStudents}
                            onChange={e => setMax(e.target.value)}
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField
                            id='fee'
                            label="Fee" 
                            name="fee"
                            size='small'
                            defaultValue={data.subject.fee}
                            onChange={e => setFee(e.target.value)}
                        />
                        <TextField
                            id='stream'
                            label="Stream" 
                            name="stream"
                            size='small'
                            defaultValue={data.subject.stream}
                            onChange={e => setStream(e.target.value)}
                        />
                    </Stack>
                </Box>
            </div>}
           
        </Box>
    );
}
 
export default ClassDetails;