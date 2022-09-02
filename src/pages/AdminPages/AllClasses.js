import { Box } from '@mui/system';
import ClassDataTable from '../../components/AdminComponents/ClassDataTable';
import Typography from '@mui/material/Typography';
import useFetch from '../../services/useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { base_url } from '../../Const/Const';
import DialogAlert from '../../components/Dialog';

const AllClasses = () => {

    const {data, isLoading, error} = useFetch(base_url+'/subjects');
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
              All Classes
            </Typography>
            </Box>

            <Box
            display='flex'
            flexWrap="wrap"
            sx={{justifyContent:match?'center':'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
                {data &&<ClassDataTable data={data}/>}
            </Box>
        </Box>
  
    );
}
 
export default AllClasses;