import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

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

export default function Login({settoken}) {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    // const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      });

    setIsLoading(true);
    setError(null);
    
    fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body:body
        }).then(res=>{
            return res.json();
        })
        .then(data=>{
            setIsLoading(false);
            if(!data['success']){
                console.log(data['error']);
                setError(data['error']);
                return;
            }
            localStorage.setItem('token', data['token']);
            
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('Fetch aborted');
            }else{
                setIsLoading(false);
                setError(err.message);
                console.log(err.message);
            }
        })
  };

  return (
    <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'solid',
            padding: 5,
            }}
        >
            <Avatar sx={{bgcolor: 'green' }}>
            <LoginOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                <span style= {{fontSize:40, fontFamily:"Times New Roman"}}>Sign in</span>
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
            <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item xs>
                <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}