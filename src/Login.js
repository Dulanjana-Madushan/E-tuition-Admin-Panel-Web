import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {base_url} from './Const/Const';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Image1 from './images/cover_two_students.jpg';
import Image2 from './images/web_login.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        tutorLK
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const body = JSON.stringify({
          email: email,
          password: password,
        });
  
      setIsLoading(true);
      setError(null);
      
      fetch(base_url+'/auth/login', {
              method: 'POST',
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
              localStorage.setItem('role', data['role']);
              if(data['role'] === 'admin'){
                  navigate('/admin');
              }else if(data['role'] === 'teacher'){
                  navigate('/teacher');
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
    <Grid container>
        <Grid item md={6}>
        <Box
                sx={{
                //marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'none',
                padding: 4,
                }}
            >
            <div className="container">
                <img alt="profile" height="550px" width="100%" src={Image1}/>
            </div>
            </Box>
        </Grid>
        <Grid item md={6} sm={12}>
            <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'none',
                padding: 5,
                backgroundColor: '#F2F2F2',
                borderRadius: 2,
                }}
            >
                <Avatar src={Image2} sx={{bgcolor: '#3F51B5', width:60,height:60}} />
                <Typography component="h1" variant="h5">
                    <span style= {{fontSize:40}}>Log In</span>
                </Typography>
                <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                />
                <Typography>
                    <span style= {{
                        fontSize:15, 
                        color:'red',
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {error}
                    </span>
                </Typography>
                {!isLoading && <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 ,backgroundColor: '#3F51B5'}}
                >
                    Log In
                </Button>}
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item xs>
                    <Link 
                    href="/register" 
                    variant="body2" 
                    // onClick={() => {
                    //     navigate("/register");
                    // }}
                    >
                        Don't have an account? Sign Up
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 2, mb:2 }} />
            </Container>
        </Grid>
    </Grid>
  );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}