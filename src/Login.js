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
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {base_url} from './Const/Const';
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

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

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
            console.log(data);
              setIsLoading(false);
              setToken(data.token);
              console.log(data.token);
              if(!data['success']){
                  setError(data['error']);
                  return;
              }
              localStorage.setItem('role', data['role']);
              let role = localStorage.getItem('role');
              if(role === 'admin'){
                  history.push('/admin');
              }else if(role === 'teacher'){
                  history.push('/teacher');
              }
              
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
    <Grid container>
        <Grid item md={6}>
            <div className="container">
                <img alt="profile" height="550px" width="100%" src={Image}/>
            </div>
        </Grid>
        <Grid item md={6} sm={12}>
            <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'none',
                padding: 5,
                }}
            >
                <Avatar sx={{bgcolor: '#4b0082' }}>
                <LoginOutlined />
                </Avatar>
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
                        {/* {error} */}
                    </span>
                </Typography>
                {!isLoading && <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 ,backgroundColor: '#4b0082'}}
                    //disabled={isLoading}
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
                    //     history.push("/register");
                    // }}
                    >
                        Don't have an account? Sign Up
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 4, mb: 4 }} />
            </Container>
        </Grid>
    </Grid>
  );
}


// export default function Login({settoken}) {

//     const [error, setError] = useState(null)
//     const [isLoading, setIsLoading] = useState(false);
//     // const history = useHistory();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const body = JSON.stringify({
//         email: data.get('email'),
//         password: data.get('password'),
//       });

//     setIsLoading(true);
//     setError(null);
    
//     fetch('http://localhost:5000/auth/login', {
//             method: 'POST',
//             headers: {"Content-Type":"application/json"},
//             body:body
//         }).then(res=>{
//             return res.json();
//         })
//         .then(data=>{
//             setIsLoading(false);
//             if(!data['success']){
//                 console.log(data['error']);
//                 setError(data['error']);
//                 return;
//             }
//             localStorage.setItem('token', data['token']);
            
//         })
//         .catch(err => {
//             if(err.name === "AbortError"){
//                 console.log('Fetch aborted');
//             }else{
//                 setIsLoading(false);
//                 setError(err.message);
//                 console.log(err.message);
//             }
//         })
//   };

//   return (
//     <Container component="main" maxWidth="sm">
//         <CssBaseline />
//         <Box
//             sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             border: 'solid',
//             padding: 5,
//             }}
//         >
//             <Avatar sx={{bgcolor: 'green' }}>
//             <LoginOutlined />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//                 <span style= {{fontSize:40, fontFamily:"Times New Roman"}}>Log In</span>
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//             />
//             <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//             />
//             <Typography>
//                 <span style= {{
//                     fontSize:15, 
//                     color:'red',
//                     display: 'flex', 
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}>
//                     {error}
//                 </span>
//             </Typography>
//             <Button
//                 type="submit"
//                 fullWidth
//                 color="success"
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 disabled={isLoading}
//             >
//                 Log In
//             </Button>
//             <Grid container>
//                 <Grid item xs>
//                 <Link href="#" variant="body2">
//                     Forgot password?
//                 </Link>
//                 </Grid>
//                 <Grid item xs>
//                 <Link href="/signup" variant="body2">
//                     Don't have an account? Sign Up
//                 </Link>
//                 </Grid>
//             </Grid>
//             </Box>
//         </Box>
//         <Copyright sx={{ mt: 4, mb: 4 }} />
//     </Container>
//   );
// }

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}