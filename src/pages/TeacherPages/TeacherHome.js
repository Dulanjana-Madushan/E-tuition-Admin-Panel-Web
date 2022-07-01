import * as React from 'react';
import { Box } from '@mui/system';
import ClassCard from '../../components/TeacherComponents/TeacherClassList';
import Typography from '@mui/material/Typography';
import useFetch from '../../useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Container,  Modal, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Class } from '@mui/icons-material';
import AddClass from './AddClass';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container:{
        width: 500,
        height: 500,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        //[theme.breakpoints.down("sm")]:{
        /*"@media (max-width: 1440px)": {
            width: "50vw",
            height: "70vh",
        },*/
    },
}));

const TeacherHome = () => {

    const {data, isLoading, error} = useFetch('http://localhost:5000/subject/myclasses/5d7a514b5d2c12c7449be041');

    const theme = useTheme();
    const history = useHistory();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    


    

    return ( 
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
        >
            <Box
                display='flex'
                flexWrap="wrap"
                backgroundColor="white"
                sx={{justifyContent:'center'}}
            >
            <Typography
              sx={{fontFamily:"Times New Roman" , fontSize:30,mb:1,mt:1}} 
            >
              My Classes
            </Typography>
            </Box>
           

            <Box
                display='flex'
                flexWrap="wrap"
                backgroundColor="white"
                sx={{justifyContent:'center'}}
            >
            <Stack direction="row" spacing={2}>
                <Button variant="contained" startIcon={<AddIcon />}  //onClick={()=>{history.push("/addClass");}}
                >
                    Add Class
                </Button>
                
                    {/* <Modal open={open}>
                        <Container className={classes.container} sx={{width:match?'':500,height:match?'':500}}>
                            <form className={classes.form} autocomplete="off">
                                <div className={classes.item}>
                                    <TextField id="standard-basic" label="Title" size="medium" style={{marginTop: 20,width:"100%"}} variant="standard"/>
                                    <TextField id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        label="Description" size="medium" style={{marginTop: 20,width:"100%"}} variant="standard"/>
                                        <input type="file" style={{marginTop:20}}/>
                                </div>
                                <div className={classes.item} style={{marginTop:20, justifyContent:"center"}} >
                                    <Button variant="contained" color="success" style={{width: 70,marginRight:20}}>Save</Button>
                                    <Button variant="contained" color="error" onClick={() => setOpen(false)}>Cancel</Button>
                                </div>
                            </form>
                        </Container>
                    </Modal> */}
                
                
            </Stack>
            </Box>

            <Box>
                <ClassCard /> 
            </Box>

            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:match?'center':'start'}}
            >
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="success" />}
                {data && data.data.map((item) => (
                    <div key={item._id}>
                        <ClassCard data={item} />
                    </div>
                ))}
            </Box>
        </Box>
  
    );
}
 
export default TeacherHome;