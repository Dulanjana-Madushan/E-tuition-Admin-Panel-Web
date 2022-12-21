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
import Image1 from '../../images/web_cover2.jpg';
import Image2 from '../../images/web_login.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
       height: "100vh",
       backgroundImage: `url(${Image1})`,
       backgroundSize: "cover",
       backgroundPosition: "center",
       backgroundAttachment: "fixed",
    },
    textfield:{
        backgroundColor: "rgba(255,255,255,0.05)",
        color:'white',
    }
});

export default function ForgetPwd() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const styles = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = JSON.stringify({
            email: email,
            });
    
        setIsLoading(true);
        setError(null);
        
        fetch(base_url+'/auth/forgotpwd', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body:body
        }).then(res=>{
            setIsLoading(true);
            return res.json();
        })
        .then(data=>{
            if(!data['success']){
                setError(data['error']);
                return;
            }else{
                setIsLoading(false);
                handleOpen();
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
                <Typography component="h1" variant="h5">
                    <span style= {{fontSize:40}}>Forget Password</span>
                </Typography>
                <Typography>
                    <span style= {{fontSize:15}}>Enter your email address to send recover code</span>
                </Typography>
                <form onSubmit={handleSubmit} >
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Typography color='red'>
                        {error}
                    </Typography>
                    {!isLoading && <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,backgroundColor: '#3F51B5'}}
                    >
                        Send code
                    </Button>}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Enter the OTP code and new password!
                        </DialogContentText>
                        <TextField
                            name="code"
                            required
                            fullWidth
                            id="code"
                            label="OTP Code"
                            margin="dense"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={navigate('/login')}>Save</Button>
                        </DialogActions>
                    </Dialog>
                    <Grid container>
                        <Grid item xs>
                        <Link href="/login" variant="body2">
                            Login?
                        </Link>
                        </Grid>
                        <Grid item xs>
                        <Link href="/register" variant="body2">
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