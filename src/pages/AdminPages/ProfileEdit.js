import * as React from 'react';
import { useState } from 'react';

import { Box } from '@mui/system';
import { Button, Stack, Typography, Checkbox, FormControlLabel, MenuItem, IconButton, TextField,
    useTheme, useMediaQuery, CircularProgress, FormGroup } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import { genders, titles } from '../../Const/Const';
import Image from '../../images/profile_photo.png';
import PropTypes from 'prop-types';

const ProfileEdit = ({setToken}) => {

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [gender, setGender] = useState(null);
    const [school, setSchool] = useState(null);
    const [qualifications, seQualifications] = useState(null);
    const [errorr, setErrorr] = useState(null)
    const [isLoadingg, setIsLoadingg] = useState(false);

    const {data, isLoading, error} = useFetch(base_url + '/auth/me');
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
                paddingLeft={2}
                paddingTop={1}
                paddingBottom={1}
                //sx={{justifyContent:'center',backgroundColor:'#F2F2F2', border:1, borderColor:'#E0E0E0', borderRadius:2}}
            >
                <Typography
                    sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}} 
                >
                    Admin Profile - Edit
                </Typography>

            </Box>

            
            <Box
            component="form" 
            display='flex'
            flexWrap="wrap"
            sx={{justifyContent:match?'center':'center'}}
            >
            {isLoading && <CircularProgress color="primary" />}
            {data && <div>
                <Box
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center'}}
                >
                    {data.photo.webContentLink && (
                                    <div>
                                        <img alt="profile" height="250px" src={data.photo.webContentLink}/>
                                    </div>
                                )}
                    {!data.photo.webContentLink && (
                                    <div>
                                        <img alt="profile" height="250px" src={Image}/>
                                    </div>
                                )}
                </Box>
                <Box 
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center'}}
                > 
                    <label htmlFor="icon-button-file">
                        <input 
                            id="icon-button-file" 
                            type="file" 
                            style={{display:"none"}}
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }} />
                        <IconButton color="primary" aria-label="upload picture" >
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    
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
                            required
                            id="name"
                            label="Name"
                            name="name"
                            size='small'
                            defaultValue={data.name}
                            onChange={e => setTitle(e.target.value)}/>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField
                            required
                            id='email'
                            label="Email" 
                            name="email"
                            size='small'
                            defaultValue={data.email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        </Stack>
                        <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField
                            required
                            id='phone'
                            label="Phone" 
                            name="phone"
                            size='small'
                            defaultValue={data.phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField 
                            required
                            id="gender"
                            label="Gender" 
                            name='gender'
                            size='small'
                            select
                            defaultValue={data.gender}
                            onChange={e => setGender(e.target.value)}
                        >
                            {genders.map((option) => (
                                <MenuItem value={option}>{option}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Stack>
                        
                    
                </Box>
                <Box
                display='flex'
                flexWrap="wrap"
                //backgroundColor="#EDf5E1"
                paddingTop={2}
                paddingBottom={2}
                sx={{justifyContent:match?'center':'center'}}
                >
                    <Stack direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}>
                        {!isLoading && <Button  type="submit" variant="contained" sx={{ mt: 3, mb: 2 ,backgroundColor: '#3F51B5'}}>
                            Save
                        </Button>}
                        
                    </Stack>
                </Box>
            </div>}
            </Box>
        </Box>
    );
}

ProfileEdit.propTypes = {
    setToken: PropTypes.func.isRequired
}
 
export default ProfileEdit;