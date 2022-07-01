import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, Checkbox, Container,  FormControlLabel,  FormGroup,  IconButton,  Input,  Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    container:{
        //width: 500,
        //height: 500,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        //[theme.breakpoints.down("sm")]:{
        /*"@media (max-width: 1440px)": {
            width: "50vw",
            height: "70vh",
        },*/
    },
}));


const TeacherProfile = () => {


    const theme = useTheme();
    const classes = useStyles();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);
   


    

    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%', backgroundColor:"#EDf5E1"}}
        >
            <Box
                display='flex'
                flexWrap="wrap"
                backgroundColor="#EDf5E1"
                paddingLeft={2} 
                paddingBottom={7}
                sx={{justifyContent:'left'}}
            >
            <Typography
              sx={{fontFamily:"Times New Roman" , fontSize:30,mb:1,mt:1}} 
            >
              Teacher Profile
            </Typography>

            </Box>
            
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:match?'center':'center'}}
            >

                <Card>
                <CardMedia
                    // component="img"
                    alt="class media"
                    style={{height: 250, width:250}}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_YtLi_0fU9VqLch7g0n4WzIAuQJnjLZu-hA&usqp=CAU"
                />
                </Card>
            </Box>

            <Box 
                display='flex'
                flexWrap="wrap"
                backgroundColor="#EDf5E1"
                paddingBottom={2}
                sx={{justifyContent:match?'center':'center'}}>
                    
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" style={{display:"none"}} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton>
                </label>
                
            </Box>

            


            <Box
            display='flex'
            flexWrap="wrap"
            backgroundColor="#EDf5E1"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch'},justifyContent:match?'center':'center'
            }}
            noValidate
            autoComplete="off"
            >

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <TextField label="Title" id="filled-size-normal" defaultValue="Mr." variant="filled"/>
                <TextField label="Name" id="filled-size-normal" defaultValue="Teacher First" variant="filled"/>
            </Stack>



            <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            >
            <TextField label="Email" id="filled-size-normal" defaultValue="Teacher@gmail.com" variant="filled"/>
            <TextField id="filled-size-normal" defaultValue="Male" variant="filled"/>
            </Stack>



            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
            <TextField label="Phone" id="filled-size-normal" defaultValue="1234567890" variant="filled"/>
            <TextField label="School/Institute" id="filled-size-normal" defaultValue="University of Ruhuna" variant="filled"/>
            </Stack>



            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{
                   justifyContent:match?'center':'left'
                }}
            >
                <FormControlLabel control={<Checkbox/>} label="Undergraduate"></FormControlLabel>
                <FormControlLabel control={<Checkbox/>} label="Postgraduate"></FormControlLabel>
                <FormControlLabel control={<Checkbox/>} label="BSc"></FormControlLabel>
                <FormControlLabel control={<Checkbox/>} label="MSc"></FormControlLabel>
                <FormControlLabel control={<Checkbox/>} label="PHD"></FormControlLabel>
         
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
                    <Button variant="contained" color="success">
                        Update
                    </Button>
                    
                </Stack>
            </Box>
           
        </Box>
    );
}
 
export default TeacherProfile;

