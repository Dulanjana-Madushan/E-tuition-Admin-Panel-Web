import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { base_url } from '../../Const/Const';

import { Box } from '@mui/system';
import { 
    Typography, 
    useTheme, 
    useMediaQuery } from '@mui/material';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const AddStudent = () => {
    const {subjectid} = useParams();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [name, setName] = useState(null);
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(base_url + '/users/students/?name='+name, {
            method: 'GET',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')}},
        )
            .then(res =>{
                return res.json();
            })
            .then(data => {
                if(data['success']){
                    setData(data['data']);
                }else{
                    setError(data['error'])
                }
                setIsLoading(false);
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    setError('Fetch aborted');
                }else{
                    setIsLoading(false);
                    setError(err.message);
                }
            })

            return () => abortCont.abort();

    },[name, updated])

    
    const handleEnroll = (event) => {

        setIsLoading(true);
        setError(null);
        fetch(base_url+'/subjects/' + subjectid + '/notification', {
            method: 'POST',
            headers: {"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
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
            setName(null);
            setUpdated(!updated);
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
        ><Box
        marginTop = {2}
        marginBottom = {2}
        display='flex'
        flexWrap="wrap"
        paddingLeft={2}
        paddingTop={1}
        paddingBottom={1}
        //sx={{justifyContent:'center',backgroundColor:'#F2F2F2',border:1, borderColor:'#E0E0E0',borderRadius: 2}}
     >
         <Typography
             sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}
         >
             Add Students
         </Typography>
     </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'right', mb:2}}
            >
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: 2 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search by Students Name"
                        inputProps={{ 'aria-label': 'search by name' }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                </Box>
            <Box
            display='flex'
            flexWrap="wrap"
            flexDirection="column"
            sx={{justifyContent:match?'center':'start'}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <Box sx={{ mt: 2}}>
                            
                        </Box>
                    </div>
                ))}
            </Box>
        </Box>
    );
}
 
export default AddStudent;