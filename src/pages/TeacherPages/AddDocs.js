import * as React from "react";
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { 
    Grid, 
    Container, 
    Box, 
    Radio, 
    RadioGroup, 
    TextField, 
    FormControlLabel, 
    FormControl, 
    Typography, 
    Button, 
    CircularProgress} from "@mui/material";

import DialogAlert from '../../components/Dialog';
import FilePicker from "../../components/FilePicker";
import { base_url } from '../../Const/Const';

export default function AddDoc() {
    const [Svalue, setSvalue] = useState(null);
    const [text, setText] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { lmsid } = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSvalue(event.target.value);
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        const body = JSON.stringify({
            text: text,
            uploadType: Svalue,
        });

        setIsLoading(true);
        setError(null);
        fetch(base_url+'/lms/' + lmsid + '/lmsdoc', {
            method: 'POST',
            headers: {"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
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
            }else{
                navigate(-1);
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
    }

  return (
    <Box 
        display='flex'
        flexDirection='column'
        sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
    >
        <Box
            marginTop = {2}
            display='flex'
            flexWrap="wrap"
            marginBottom={2}
            sx={{justifyContent:'center',backgroundColor:'#D9DDDC', borderRadius: 2}}
        >
            <Typography
                sx={{fontSize:30,mb:1,mt:1}}
            >
                Uplaod Documents
            </Typography>
        </Box>
        <Typography sx={{fontSize:20,}} >Select class materials type</Typography>
        <Grid container direction={"row"}>
            <Grid
                sx={{
                    textAlign: "left",
                }}
            >
                <FormControl sx={{ mt: 3 }}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                    >
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="text" control={<Radio />} label="Text" onChange={handleChange} />
                        </Box>
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="classNotes" control={<Radio />} label="Class Notes" onChange={handleChange} />
                        </Box>
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="assignment" control={<Radio />} label="Assignment" onChange={handleChange} />
                        </Box>
                        <Box
                            width='200px'
                        >
                            <FormControlLabel value="quiz" control={<Radio />} label="Quiz" onChange={handleChange} />
                        </Box>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12}>
                <Box
                    sx={{
                        borderRadius: 1,
                        mt: 3,
                        mb:3
                    }}
                >
                {
                    Svalue === "classNotes" || Svalue === "assignment" 
                    ? <FilePicker/> 
                    : <Box></Box>
                }
                {
                    Svalue === "quiz" 
                    ? <h4>This is quiz</h4>
                    : <Box></Box>
                }
                {
                    Svalue === "text" 
                    ? <Container component="main" maxWidth="sm">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                required
                                size='small'
                                autoComplete="text"
                                name="text"
                                fullWidth
                                id="text"
                                label="Text"
                                margin="normal"
                                multiline={true}
                                onChange={e => setText(e.target.value)}
                            />
                            <Box
                                display='flex'
                                flexWrap="wrap"
                                flexDirection='row'
                                sx={{justifyContent:'center', mt:1}}
                            >
                                <Button  variant="contained" type="submit" sx={{backgroundColor:"green",color:"white"}}>
                                    Save
                                </Button>

                            </Box>
                        </form>
                    </Container>
                    : <Box></Box>
                }
                </Box>
            </Grid>
        </Grid>
        <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div color="red">{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
            </Box>
    </Box>
  );
}