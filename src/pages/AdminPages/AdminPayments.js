import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { 
    Typography, 
    CircularProgress, 
    TextField } from '@mui/material';

import useFetch from '../../services/useFetch';
import PayTable from '../../components/AdminComponents/PayTable';
import DialogAlert from '../../components/Dialog';
import { base_url } from '../../Const/Const';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AdminPayments = () => {

    var today = new Date();
    const date = today.getFullYear() + '-' + today.toLocaleString('default', { month: 'long' });
    const [date1, setDate1] = useState(date);
    const { subjectid } = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/getpayments?date=' + date1);

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
            >
            <Typography
             sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}} 
            >
              Class payment Details
            </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'center', alignItems:'center'}}
            >
                <Typography>Select a month and a year</Typography><Box mr={2}></Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        views={['year', 'month']}
                        minDate={dayjs('2012-03-01')}
                        maxDate={dayjs('2023-06-01')}
                        value={date1}
                        
                        onChange={(newValue) => {
                            const newDate = new Date(newValue).getFullYear() + '-' + new Date(newValue).toLocaleString('default', { month: 'long' });
                            setDate1(newDate);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} size='small' margin='dense' disabled={true} />}
                    />
                </LocalizationProvider>
            </Box>
            <Box
                 display='flex'
                 flexWrap="wrap"
                 flexDirection='row'
                 sx={{justifyContent:'center', alignItems:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color='red'>{error}</Typography>}
                {isLoading && <CircularProgress color="primary" />}
                {data &&<PayTable data={data}/>}
            </Box>

        </Box>
    );
}
export default AdminPayments;
 
