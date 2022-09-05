import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { Box } from '@mui/system';
import { Typography, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import TeacherPayTable from '../../components/TeacherComponents/TeacherPayTable';
import DialogAlert from '../../components/Dialog';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { base_url } from '../../Const/Const';
import useFetch from '../../services/useFetch';



const Payments = () => {
    var today = new Date();
    const date = today.getFullYear() + '-' + today.toLocaleString('default', { month: 'long' });
    const [date1, setDate1] = useState(date);
    const { subjectid } = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/getpayments?date=' + date1);
    console.log(data);

    return (
        <Box 
            display='flex'
            flexDirection='column'
            sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
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
                   Payments
                </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box 
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'center'}}
                >
                     <Typography
                        sx={{fontSize:20,mb:1,mt:1,mr:2}} 
                    >
                        Select Year and Month
                    </Typography>
                    <DatePicker
                        inputFormat="MMMM-yyyy"
                        views={['month', 'year']}
                        minDate={new Date('2012-03-01')}
                        maxDate={new Date('2050-06-01')}
                        value={date1}
                        disableFuture={true}
                        onChange={(newValue) => {
                            const newDate = new Date(newValue).getFullYear() + '-' + new Date(newValue).toLocaleString('default', { month: 'long' });
                            setDate1(newDate);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                </Box>
            </LocalizationProvider>
            <Box
                 display='flex'
                 flexWrap="wrap"
                 flexDirection='row'
                 sx={{justifyContent:'center', alignItems:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color='red'>{error}</Typography>}
                {isLoading && <CircularProgress color="primary" />}
                {data &&<TeacherPayTable data={data}/>}
            </Box>
        </Box>
    );
}
 
export default Payments;