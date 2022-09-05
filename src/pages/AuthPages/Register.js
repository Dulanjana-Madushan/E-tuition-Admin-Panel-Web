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
import Image2 from '../../images/web_login.png';
import { base_url } from '../../Const/Const';
import MenuItem from '@mui/material/MenuItem';
import { titles, genders } from '../../Const/Const';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import CssBaseline from '@mui/material/CssBaseline';
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
  const [title, setTitle] = useState(titles[0]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [gender, setGender] = useState(genders[0]);
  const [school, setSchool] = useState(null);
  const [qualifications, setQualifications] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const styles = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("verifications", selectedImage);
    data.append('title', title);
    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('password', password);
    data.append('gender',gender);
    data.append('role', 'teacher');
    data.append('school', school);
    data.append('qualifications', '['+qualifications.toString()+']' ?? '[]');

    setIsLoading(true);
    
    fetch(base_url+'/users/regteacher', {
            method: 'POST',
            headers: {},
            body:data
        }).then(res=>{
          setIsLoading(true);
          return res.json();
        })
        .then(data=>{
            setIsLoading(false);
            if(!data['success']){
                setError(data['error']);
            }else{
                navigate('/login');
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
    <div className={styles.app}>
    <CssBaseline />
    <Container component="main" maxWidth="sm" sx={{paddingTop:3}}>
        <Box
          className={styles.glass}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'none',
            paddingTop: 2,
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 1,
            borderRadius: 2,
          }}
        >
          <Avatar src={Image2} sx={{bgcolor: '#3F51B5', width:60,height:60}}/>
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
              value={title}
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
              onChange={e => setName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              margin="dense"
              size='small'
              onChange={e => setEmail(e.target.value)}
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
              value={gender}
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
              onChange={e => setPhone(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name="schools"
              label="Schools/Institutes"
              id="schools"
              margin="dense"
              size='small'
              onChange={e => setSchool(e.target.value)}
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
                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'Undergraduate'])}/>} value='Undergraduate' label="Undergraduate" />
                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'Postgraduate'])}/>} value='Postgraduate' label="Postgraduate" />
                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'BSc'])}/>} value='BSc' label="BSc" />
                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'MSc'])}/>} value='MSc' label="MSc" />
                <FormControlLabel control={<Checkbox onClick={()=>setQualifications([...qualifications, 'PHD'])}/>} value='PHD' label="PHD" />
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
                    {selectedImage && selectedImage.type === 'image/jpeg' &&(
                        <div>
                            <img alt="not fount" width={"100px"} src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <Button sx={{color:'red'}} size='small' onClick={()=>{
                                ref.current.value = null;
                                setSelectedImage(null)}}>Remove</Button>
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
                    {selectedImage && selectedImage.type !== 'image/jpeg' &&(
                      <Box
                          display='flex'
                          flexWrap="wrap"
                          sx={{justifyContent:'end'}}
                      >
                          <Button sx={{color:'red'}} size='small' onClick={()=>{
                              ref.current.value = null;
                              setSelectedImage(null)}}>Remove</Button>
                      </Box>
                  )}
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
            <Typography color = 'red'>{error}</Typography>
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