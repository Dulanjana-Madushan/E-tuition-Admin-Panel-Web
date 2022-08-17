import { useNavigate, useParams, Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Avatar, CircularProgress, Rating } from '@mui/material';
import { useState } from 'react';
import { Button, Stack, Typography, Checkbox, FormControlLabel, MenuItem, IconButton, TextField,
    useTheme, useMediaQuery, FormGroup } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';

const OneStudent = () => {

    const theme = useTheme();
    const { userid } = useParams();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [school, setSchool] = useState(null);

    const {data, isLoading, error} = useFetch(base_url + '/users/' + userid);

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
                sx={{justifyContent:'center',backgroundColor:'#F2F2F2',borderRadius: 2}}
            >
                <Typography
                    sx={{fontSize:30, mb:1, mt:1}} 
                >
                    Student Details
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
                                        <img alt="profile" height="250px" src={data.user.photo.webContentLink}/>
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
                            id="name"
                            label="Name" 
                            name="name"
                            size='small'
                            defaultValue={data.user.name}
                            onChange={e => setName(e.target.value)}
                        />
                        </Stack>
                        <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                         
        
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            size='small'
                            defaultValue={data.user.email}
                            onChange={e => setEmail(e.target.value)}/>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField 
                            id="phone"
                            label="Phone" 
                            name="phone"
                            size='small'
                            defaultValue={data.user.phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        </Stack>
                        <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                         
        
                        <TextField
                            id="birthday"
                            label="Birthday"
                            name="birthday"
                            size='small'
                            defaultValue={data.user.birthday}
                            onChange={e => setBirthday(e.target.value)}/>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField 
                            id="gender"
                            label="Gender" 
                            name="gender"
                            size='small'
                            defaultValue={data.user.gender}
                            onChange={e => setGender(e.target.value)}
                        />
                        </Stack>
                        <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                         
        
                        <TextField
                            id="school"
                            label="School"
                            name="school"
                            size='small'
                            defaultValue={data.user.school}
                            onChange={e => setSchool(e.target.value)}/>
                    </Stack>  
                </Box>
            </div>}
           
        </Box>
    );
}
 
export default OneStudent ;


// import { useHistory, useParams, Link } from 'react-router-dom';
// import { Box } from '@mui/system';
// import { Avatar, CircularProgress, Rating } from '@mui/material';
// import { useState } from 'react';
// import { Button, Stack, Typography, Checkbox, FormControlLabel, MenuItem, IconButton, TextField,
//     useTheme, useMediaQuery, FormGroup } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// import useFetch from '../../services/useFetch';
// import { base_url } from '../../Const/Const';

// const OneStudent = () => {

//     const theme = useTheme();
//     const { userid } = useParams();
//     const match = useMediaQuery(theme.breakpoints.down("sm"));
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [name, setName] = useState(null);
//     const [email, setEmail] = useState(null);

//     const {data, isLoading, error} = useFetch(base_url + '/users/' + userid);

//     console.log(data);

//     return (
//         <Box
//             display='flex'
//             flexDirection='column'
//             padding={2}
//             sx={{mt: 6, pl:2, pr:2, width:'100%'}}
//         >
//             <Box
//                  marginTop = {2}
//                  marginBottom = {2}
//                  display='flex'
//                  flexWrap="wrap"
//                  //backgroundColor="#EDf5e1"
//                  paddingLeft={2}
//                  paddingBottom={2}
//                 sx={{justifyContent:'center',backgroundColor:'#D9DDDC',borderRadius: 2}}
//             >
//                 <Typography
//                     sx={{fontSize:30, mb:1, mt:1}} 
//                 >
//                     Student Details
//                 </Typography>

//             </Box>
//             {isLoading && <CircularProgress color="success"/>}
//             {data && <div>
//                 <Box
//                     display='flex'
//                     flexWrap="wrap"
//                     sx={{justifyContent:'center'}}
//                 >

//                                     <div>
//                                         <img alt="profile" height="250px" src={data.user.photo.webContentLink}/>
//                                     </div> 
//                     {/* {!selectedImage && (
//                                     <div>
//                                         <img alt="profile" height="250px" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU'/>
//                                     </div>
//                                 )}
//                     {selectedImage && (
//                                     <div>
//                                         <img alt="profile" height="250px" src={URL.createObjectURL(selectedImage)} />
//                                         <br />
//                                         <button onClick={()=>{
//                                             // ref.current.value = null;
//                                             setSelectedImage(null)}}>Remove</button>
//                                         <br/><br/>
//                                     </div>
//                                 )} */}
//                 </Box>

//                 <Box
//                     display='flex'
//                     flexWrap="wrap"
//                     component="form"
//                     sx={{'& .MuiTextField-root': { m: 1, width: '50ch'},justifyContent:'center'}}
//                 >
//                     <Stack
//                         direction={{ xs: 'column', sm: 'row' }}
//                         spacing={{ xs: 1, sm: 2, md: 4 }}
//                     >
//                         <TextField 
//                             id="name"
//                             label="Name" 
//                             name="name"
//                             size='small'
//                             defaultValue={data.user.name}
//                             onChange={e => setName(e.target.value)}
//                         />
        
//                         <TextField
//                             id="email"
//                             label="Email"
//                             name="email"
//                             size='small'
//                             defaultValue={data.user.email}
//                             onChange={e => setEmail(e.target.value)}/>
//                     </Stack>
                    
//                 </Box>
//             </div>}
           
//         </Box>
//     );
// }
 
// export default OneStudent ;