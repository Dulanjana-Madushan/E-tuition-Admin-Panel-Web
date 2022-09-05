import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

import { Box } from '@mui/system';
import { 
    Button, 
    Stack, 
    Typography, 
    Checkbox, 
    FormControlLabel, 
    MenuItem, 
    IconButton, 
    TextField,
    useTheme, 
    useMediaQuery,
    CircularProgress } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import DialogAlert from '../../components/Dialog';
import { base_url, genders, titles } from '../../Const/Const';


export default function TeacherUpdateProfile(){

    const ref = useRef();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [gender, setGender] = useState(null);
    const [school, setSchool] = useState(null);
    const [qualifications, setQualifications] = useState(null);    
    const [updated, setUpdated] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/auth/me', {
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
                    setTitle(data.title);
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setGender(data.gender);
                    setSchool(data.school);
                    setQualifications(data.qualifications);
                }else{
                    setError(data['error']);
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

    const updatePhoto = (event)=>{
        const formData = new FormData();

        formData.append("image", selectedImage);
        
        setIsLoading(true);
        setError(null);
        fetch(base_url+'/users/pic', {
            method: 'PUT',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')
            },
            body:formData
        }).then(res=>{
            setIsLoading(true);
            return res.json();
        })
        .then(data=>{
            if(!data['success']){
                setError(data['error']);
            }else{
                setIsLoading(false);
                setSelectedImage(null)
                setUpdated();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = JSON.stringify({
            title: title,
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            school: school,
            qualifications: qualifications
          });
    
        setIsLoading(true);
        setError(null);
        
        fetch(base_url+'/users', {
            method: 'PUT',
            headers: {"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')},
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
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('Fetch aborted');
            }else{
                setIsLoading(false);
                setError(err.message);
            }
        })
      };
   
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
            >
                <Typography
                    sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}} 
                >
                    Update Profile
                </Typography>
            </Box>
            <Box sx={{ mt: 1 ,justifyContent:'center'}}>
            <Box 
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:match?'center':'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color='red'>{error}</Typography>}
                {isLoading && <CircularProgress color="primary" />}
            </Box>
            {data && <div>
                <Box
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center'}}
                >
                    { !data.photo.id && <div>
                        <img alt="profile" height="250px" src={data.photo.webContentLink}/>
                    </div>}
                    { !selectedImage && <div>
                        <img alt="profile" height="250px" src={data.photo.webContentLink}/>
                    </div>}     
                    {selectedImage && <div>
                        <img alt="profile" height="250px" src={URL.createObjectURL(selectedImage)} />
                        <br />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                            <button onClick={()=>{
                                ref.current.value = null;
                                setSelectedImage(null)}}>Remove</button>
                            <button onClick={()=>{updatePhoto()}}>Save</button>
                        </Box>
                        <br/><br/>
                    </div>}
                </Box>
                <Box 
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center'}}
                > 
                    <label htmlFor="icon-button-file">
                        <input 
                        accept="image/*"
                            ref={ref}
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
                <form onSubmit={handleSubmit}>
                    <Box
                        display='flex'
                        flexWrap="wrap"
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
                                onChange={e => setName(e.target.value)}/>
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
                                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'Undergraduate'])} checked={data.qualifications.includes('Undergraduate')}/>} label="Undergraduate"></FormControlLabel>
                                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'Postgraduate'])} checked={data.qualifications.includes('Postgraduate')}/>} label="Postgraduate"></FormControlLabel>
                                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'BSc'])} checked={data.qualifications.includes('BSc')}/>} label="BSc"></FormControlLabel>
                                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'MSc'])} checked={data.qualifications.includes('MSc')}/>} label="MSc"></FormControlLabel>
                                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'PHD'])} checked={data.qualifications.includes('PHD')}/>} label="PHD"></FormControlLabel>
                        </Stack>
                    </Box>
                    <Box
                        display='flex'
                        flexWrap="wrap"
                        flexDirection='row'
                        sx={{justifyContent:match?'center':'center', mt:2}}
                    >
                        <Button variant='contained' type='submit' sx={{justifyContent:match?'center':'center', backgroundColor:"#3F51B5", color:'white'}}>Update</Button>
                    </Box>
                </form>
            </div>}
           </Box>
        </Box>
    );
}