import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Image1 from '../../images/cover_two_students.jpg';
import Image2 from '../../images/web_login.png';
import { base_url } from '../../Const/Const';
import MenuItem from '@mui/material/MenuItem';
import { titles, genders } from '../../Const/Const';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Image1 from './images/cover_two_students.jpg';
// import Image2 from './images/web_login.png';
// import {base_url} from './Const/Const';
import Image3 from '../../images/web_cover2.jpg';
import { makeStyles }from '@mui/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
        tutorLK
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
  glass: {
      backgroundColor: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(8.5px)",
  },
  app: {
     width:"100%",
     backgroundImage: `url(${Image3})`,
     backgroundSize: "cover",
     backgroundPosition: "center",
     backgroundAttachment: "fixed",
  },
  
});

export default function Register() {

     const ref = useRef();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [title, setTitle] = useState(titles[0]);
    const [gender, setGender] = useState(genders[0]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [show, setShow] = useState(false);
    const styles = useStyles();

    const handleChange = (event) => {
      setGender(event.target.value);
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      });
    setIsLoading(true);
    
    console.log(body);
    fetch(base_url+'/auth/register', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body:body
        }).then((response)=>{
            console.log(response);
            setIsLoading(false);
            // history.go(-1);
            // history.push('/')
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('Fetch aborted');
            }else{
                setIsLoading(false);
                setError(err.message);
            }
        })
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className={styles.app}>
    <CssBaseline />
    <Container component="main" maxWidth="sm" sx={{paddingTop:3}}>
        <Box
          className={styles.glass}
          sx={{
            // marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'none',
            paddingTop: 2,
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 1,
            //backgroundColor: '#F2F2F2',
            borderRadius: 2,
          }}
        >
          <Avatar src={Image2} sx={{bgcolor: '#3F51B5', width:60,height:60}}/>
            {/* <LoginOutlined />
          </Avatar> */}
          <Typography component="h1" variant="h5" color='#3F51B5'>
              <span style= {{fontSize:40}}>Sign up</span>
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              required
              id="title"
              label="Title" 
              name='title'
              margin="dense"
              fullWidth
              size='small'
              select
              onChange={e => setTitle(e.target.value)}
            >
              {titles.map((option) => (
                  <MenuItem value={option}>{option}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              name="userName"
              fullWidth
              id="userName"
              label="User Name"
              margin="dense"
              size='small'
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              margin="dense"
              size='small'
            />
            <TextField 
              required
              id="gender"
              label="Gender"
              name='gender'
              margin="dense"
              fullWidth
              select
              size='small'
              onChange={e => setGender(e.target.value)}
            >
              {genders.map((option) => (
                  <MenuItem value={option}>{option}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              id="contact"
              label="contact Number"
              name="contact"
              margin="dense"
              size='small'
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              margin="dense"
              size='small'
            />
            <TextField
              required
              fullWidth
              name="schools"
              label="Schools/Institutes"
              id="schools"
              margin="dense"
              size='small'
            />
            <Box 
              display='flex'
              flexWrap="wrap"
              marginTop={1}
              marginBottom={1}
              padding={1}
              sx={{justifyContent:'start', border:1, borderColor:'#b0b5b8', borderRadius:1}}
            >
              <FormGroup>
                <FormControlLabel control={<Checkbox />} value='Undergraduate' label="Undergraduate" />
                <FormControlLabel control={<Checkbox />} value='Postgraduate' label="Postgraduate" />
                <FormControlLabel control={<Checkbox />} value='BSc' label="BSc" />
                <FormControlLabel control={<Checkbox />} value='MSc' label="MSc" />
                <FormControlLabel control={<Checkbox />} value='PHD' label="PHD" />
              </FormGroup>
            </Box>
            <Typography>Add a class poster</Typography>
            <Typography><span style= {{fontSize:12, color:'gray'}}>File should be *.jpg, *.png, *.pdf</span></Typography>
            <Box 
                display='flex'
                flexWrap="wrap"
                padding={1}
                sx={{justifyContent:'start', border:1, borderColor:'#b0b5b8', borderRadius:1}}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 ,backgroundColor: '#3F51B5'}}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            {error}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 2, pb:2 }} />
    </Container>
    </div> 
  );
}