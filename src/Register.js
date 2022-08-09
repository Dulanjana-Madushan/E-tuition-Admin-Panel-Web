import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Image from './images/hey.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        E - Tuition
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      });
    setIsLoading(true);
    
    console.log(body);
    fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body:body
        }).then((response)=>{
            console.log(response);
            setIsLoading(false);
            // history.go(-1);
            history.push('/')
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
  <Grid container>
    <Grid item md={6}>
            <div className="container">
                <img alt="profile" height="550px" width="100%" src={Image}/>
            </div>
    </Grid>
    <Grid item md={6} sm={12}>
    <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'none',
            padding: 2,
          }}
        >
          <Avatar sx={{bgcolor: '#4b0082' }}>
            <LoginOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
              <span style= {{fontSize:40}}>Sign up</span>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                autoComplete="username"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                margin="dense"
            />
            <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                margin="dense"
            />
            <TextField
                required
                fullWidth
                id="contact"
                label="contact Number"
                name="contact"
                autoComplete="contact"
                margin="dense"
            />
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                margin="dense"
            />
            <TextField
                required
                fullWidth
                name="skills"
                label="Qualifications"
                id="skills"
                autoComplete="skills"
                margin="dense"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor: '#4b0082'}}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            {error}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 1 }} />
    </Container>
    </Grid>
  </Grid>
  );
}