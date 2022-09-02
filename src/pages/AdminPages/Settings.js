import { Box } from '@mui/system';
//import ClassCard from '../../components/TeacherClassList';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';

import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {base_url} from '../../Const/Const';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
//import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Settings = ({setToken}) => {
    const [currentpassword, setCurrentpassword] = useState();
    const [newpassword, setNewpassword] = useState();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    //const styles = useStyles();

    const handleSubmit = (event) => {
      event.preventDefault();
      const body = JSON.stringify({
          currentpassword: currentpassword,
          newpassword: newpassword,
        });
  
      setIsLoading(true);
      setError(null);
      
      fetch(base_url+'/auth/updatepassword', {
              method: 'PUT',
              headers: {"Content-Type":"application/json"},
              body:body
          }).then(res=>{
            setIsLoading(true);
            return res.json();
          })
          .then(data=>{
              setIsLoading(false);
              setToken(data['token']);
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

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));


    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%', backgroundColor:"white"}}
        >
            <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                //backgroundColor="#EDf5e1"
                paddingLeft={2}
                paddingTop={1}
                paddingBottom={1}
               //sx={{justifyContent:'center',backgroundColor:'#F2F2F2',border:1, borderColor:'#E0E0E0',borderRadius: 2}}
               >

            <Typography
              sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}  
            >
              Settings
            </Typography>
            </Box>

           <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                //backgroundColor="#EDf5e1"
                paddingLeft={2}
                
               sx={{justifyContent:'center'}}>

            <Typography
              sx={{fontSize:20,color:"#3F51B5"}}  
            >
              Reset Password
            </Typography>
            </Box>
           
            <Box
                sx={{
                //marginTop: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'none',
                //padding: 5,
                //backgroundColor: '#F2F2F2',
                borderRadius: 2,
                }}
            >
                <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="current-password"
                        label="Current Password"
                        name="Current Password"
                        autoComplete="Current Password"
                        autoFocus
                        onChange={e => setCurrentpassword(e.target.value)}
                        sx={{}}
                        //className={styles.textfield}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="New password"
                        label="New Password"
                        type="password"
                        id="new-password"
                        autoComplete="new-password"
                        onChange={e => setNewpassword(e.target.value)}
                        //className={styles.textfield}
                    ></TextField>
                    {/* <Typography>
                        <span style= {{
                            fontSize:15, 
                            color:'red',
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            {error}
                        </span>
                    </Typography> */}

                    {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="password"
                        //value={values.password}
                        onChange={e => setNewpassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            //onClick={handleClickShowPassword}
                            //onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            <VisibilityOff />
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    </FormControl> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 
                            ,backgroundColor: '#3F51B5'
                        }}
                        onClick={handleToggle}
                    >
                        Send
                    </Button>
                   
                </Box>
            </Box>

   

        
        </Box>
    );
}
 
export default Settings;

