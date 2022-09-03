import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Payments = () => {
    const [value, setValue] = useState(new Date());

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
                    value={value}
                    disableFuture={true}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                </Box>
            </LocalizationProvider>
        </Box>
    );
}
 
export default Payments;