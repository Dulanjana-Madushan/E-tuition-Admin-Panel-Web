import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useFetch from '../../services/useFetch';
import useMediaQuery from '@mui/material/useMediaQuery';
import StudentListTable from '../../components/TeacherComponents/StudentListTable';
import CircularProgress from '@mui/material/CircularProgress';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const StudentList = () => {
    const {subjectid} = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/'+ subjectid);
    console.log(data);
    var [name, setName] = useState('');
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

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
              Students List
            </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'right'}}
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
            sx={{justifyContent:'center'}}>
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
                {data &&<StudentListTable data={data.enrolledStudents}/>}
            </Box>

        </Box>
    );
}
export default StudentList;
 
