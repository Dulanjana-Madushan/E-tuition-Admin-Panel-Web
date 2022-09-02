import * as React from 'react';
import { useState } from 'react';

import { Box } from '@mui/system';
import { Button, Stack, Typography, Checkbox, FormControlLabel, MenuItem, IconButton, TextField,
    useTheme, useMediaQuery,CircularProgress, FormGroup } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import { genders, titles } from '../../Const/Const';
import Image from '../../images/profile_photo.png';
import PropTypes from 'prop-types';

export default function TeacherProfile({setToken}){

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

    function refreshPage(){
        window.location.reload(false);
    }

    const handleSubmit = async (event) => {
        // if(name == null){
        //     console.log(name);
        //     setName(data.name);
        //     console.log(name);
        // }
        if(email === null){
            console.log(email);
         setEmail(data.email);
            console.log(email);
        }
        if(phone === null){
            console.log(phone);
          setPhone(data.phone);
            console.log(phone);
        }
        // if(school == null){
        //  setSchool(data.school);
        // }
        event.preventDefault();
        const body = JSON.stringify({
            //name: name,
            email: email,
            phone: phone,
            //school: school,
          });
    
        setIsLoadingg(true);
        setErrorr(null);
        
        await fetch(base_url+'/users', {
                method: 'PUT',
                headers: {"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')},
                body:body
            }).then(res=>{
              setIsLoadingg(true);
              return res.json();
            })
            .then(dataa=>{
              console.log("blah",dataa);
                setIsLoadingg(false);
                if(!dataa['success']){
                    setErrorr(dataa['error']);
                    return;
                }
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    console.log('Fetch aborted');
                }else{
                    setIsLoadingg(false);
                    setErrorr(err.message);
                    console.log(err.message);
                }
            })
      };
   
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
                marginBottom={2}
                sx={{justifyContent:'center',backgroundColor:'#D9DDDC'}}
            >
                <Typography
                    sx={{fontSize:30, mb:1, mt:1}} 
                >
                    Teacher Profile
                </Typography>

            </Box>
            <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 ,justifyContent:'center'}}>
            {isLoading && <CircularProgress color="success" />}
            {data && <div>
                <Box
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center'}}
                >
                   
                                    <div>
                                        <img alt="profile" height="250px" src={data.photo.webContentLink}/>
                                    </div>
                              
                    {/* {selectedImage && (
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
                    sx={{justifyContent:'center'}}
                > 
                    <label htmlFor="icon-button-file">
                        <input 
                        accept="image/*"
                            id="icon-button-file" 
                            type="file" 
                            style={{display:"none"}}
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }} />
                        <IconButton color="primary" aria-label="upload picture" component="span">
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
                            id="title"
                            label="Title" 
                            name="title"
                            size='small'
                            select
                            defaultValue={data.title}
                            onChange={e => setTitle(e.target.value)}
                        >
                            {titles.map((option) => (
                                <MenuItem value={option}>{option}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Stack>
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
                        <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField
                            required
                            id="school" 
                            label="School/Institute"
                            name="school"
                            size='small'
                            defaultValue={data.school} 
                            onChange={e => setSchool(e.target.value)}
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        {/* <FormGroup> */}
                            <FormControlLabel control={<Checkbox checked/>} label="Undergraduate"></FormControlLabel>
                            <FormControlLabel control={<Checkbox/>} label="Postgraduate"></FormControlLabel>
                            <FormControlLabel control={<Checkbox/>} label="BSc"></FormControlLabel>
                            <FormControlLabel control={<Checkbox/>} label="MSc"></FormControlLabel>
                            <FormControlLabel control={<Checkbox/>} label="PHD"></FormControlLabel>
                        {/* </FormGroup> */}
                    </Stack>
                </Box>
                <Box
                display='flex'
                flexWrap="wrap"
                backgroundColor="#EDf5E1"
                paddingTop={2}
                paddingBottom={2}
                sx={{justifyContent:match?'center':'center'}}
                >
                    <Stack direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Button type="submit" variant="contained" color="success" >
                            Update
                        </Button>
                        
                    </Stack>
                </Box>
            </div>}
           </Box>
        </Box>
    );
}
 

TeacherProfile.propTypes = {
    setToken: PropTypes.func.isRequired
}


