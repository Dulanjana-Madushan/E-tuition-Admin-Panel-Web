import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {base_url} from '../../Const/Const';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Image2 from '../../images/web_login.png';
import Image3 from '../../images/web_cover2.jpg';
import { makeStyles }from '@mui/styles';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
       height: "100vh",
       backgroundImage: `url(${Image3})`,
       backgroundSize: "cover",
       backgroundPosition: "center",
       backgroundAttachment: "fixed",
    },
    textfield:{
        backgroundColor: "rgba(255,255,255,0.05)",
        color:'white',
    }
    
});

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const styles = useStyles();

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
            if(!data['success']){
                setError(data['error']);
                return;
            }
            setToken(data['token']);
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

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.app}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{paddingTop: 10}}>
                <Box
                    className={styles.glass}
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: 'none',
                    padding: 5,
                    borderRadius: 2,
                    }}
                >
                    <Avatar src={Image2} sx={{bgcolor: '#3F51B5', width:80,height:80}} />
                    <Typography component="h1" variant="h5" color='#3F51B5'>
                        <span style= {{fontSize:40,}}>tutorLK</span>
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
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
                            sx={{ mt: 3, mb: 2 
                                ,backgroundColor: '#3F51B5'
                            }}
                        >
                            Log In
                        </Button>}
                        {isLoading && <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>}
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgetpwd" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link 
                                href="/register" 
                                variant="body2" 
                                >
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
    
                    </form>
                </Box>
                <Copyright sx={{ mt: 2, mb:2 }} />
            </Container>
     </div>
   
   );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}