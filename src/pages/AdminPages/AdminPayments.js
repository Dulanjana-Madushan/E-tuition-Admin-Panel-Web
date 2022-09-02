import * as React from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import useFetch from '../../services/useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import PayTable from '../../components/AdminComponents/PayTable';
//import CustomPaginationGrid from '../components/AdminComponents/StudentsDataTable';
import CircularProgress from '@mui/material/CircularProgress';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';
import { useNavigate,useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const AdminPayments = () => {

    var today = new Date();
    const date = today.getFullYear() + '-' + today.toLocaleString('default', { month: 'long' });
    const [date1, setDate1] = useState(date);
    const { subjectid } = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/getpayments?date=' + date1);
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(dayjs());

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
                //backgroundColor="#EDf5e1"
                paddingLeft={2}
                paddingTop={1}
                paddingBottom={1}
            //    sx={{justifyContent:'center',backgroundColor:'#F2F2F2',border:1, borderColor:'#E0E0E0',borderRadius: 2
            // }}
                
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
 
