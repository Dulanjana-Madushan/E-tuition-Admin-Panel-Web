import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import useFetch from '../../services/useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import VerificationTable from '../../components/AdminComponents/VerificationTable';

import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';


const Verification = () => {
    // const {data, isLoading, error} = useFetch(base_url + '/admin/req');

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(base_url + '/admin/req', {
            method: 'GET',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')}},
        {signal:abortCont.signal})
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

    },[updated])



    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
        >
             <Box
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
              Teacher Verification
            </Typography>
            </Box>
           
            <Box
            display='flex'
            flexWrap="wrap"
            sx={{justifyContent:'center'}}>
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
                {data &&<VerificationTable data={data} updated={updated} setUpdated={setUpdated}/>}
            </Box>

        
        </Box>
    );
}
 
export default Verification;

