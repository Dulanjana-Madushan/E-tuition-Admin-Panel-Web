import { Box } from '@mui/system';
import ClassDataTable from '../../components/AdminComponents/ClassDataTable';
import Typography from '@mui/material/Typography';
import useFetch from '../../services/useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import { set, setDate } from 'date-fns';

const AllClasses = () => {

    var {data, isLoading, error} = useFetch(base_url+'/subjects');
    var [name, setName] = useState('');
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    //!Search function
    if(data !== null){
        if(name !== ''){
            var data1 = data.filter((item) => {
                console.log(item.subject.startsWith(name))
                item.subject.startsWith(name)});
        }
        // setDate(data1);
    }

    // console.log(data.filter((item) => {
    //     console.log(item.subject)
    //     item.subject.startsWith(name)}));

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
              sx={{fontSize:30,mt:1,color:"#3F51B5",fontWeight: 600}}  
            >
              All Classes
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
            sx={{justifyContent:match?'center':'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color='red'>{error}</Typography>}
                {isLoading && <CircularProgress color="primary" />}
                {data && <ClassDataTable data={data}/>}
            </Box>
        </Box>
  
    );
}
 
export default AllClasses;