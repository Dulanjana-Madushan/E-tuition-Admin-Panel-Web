import { useParams } from 'react-router-dom';
import DialogAlert from '../../components/Dialog';

import { Box } from '@mui/system';
import { Stack, Typography, TextField, CircularProgress, Rating} from '@mui/material';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';

const ClassDetails = () => {

    const { subjectid } = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid);

    return (
        <Box
            display='flex'
            flexDirection='column'
            padding={2}
            sx={{mt: 6, pl:2, pr:2, width:'100%'}}
        >
            <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                paddingLeft={2}
                paddingBottom={2}
                sx={{justifyContent:'center',backgroundColor:'#F2F2F2',borderRadius: 2}}
            >
                <Typography
                    sx={{fontSize:30, mb:1, mt:1}} 
                >
                    Class Details
                </Typography>

            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
                
                {data && <div>
                    <Box
                        display='flex'
                        flexWrap="wrap"
                        flexDirection='row'
                        sx={{justifyContent:'center', mt:1}}
                    >
                        <img alt="profile" height="250px" src={data.subject.post.webContentLink}/>
                    </Box>
                    <Box
                        display='flex'
                        flexWrap="wrap"
                        component="form"
                        sx={{'& .MuiTextField-root': { m: 1, width: '50ch'},justifyContent:'center'}}
                    >  
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField 
                                id="name"
                                label="name" 
                                name="name"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.teacher.title +" "+data.subject.teacher.name}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id="description"
                                label="Description"
                                name="description"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.description}/>
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='type'
                                label="Class Type" 
                                name="type"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.type}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='stream'
                                label="Stream" 
                                name="stream"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.stream}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='fee'
                                label="Fee" 
                                name="fee"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.fee}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='medium'
                                label="Medium" 
                                name="medium"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.medium}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='paydate'
                                label="Paydate" 
                                name="paydate"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.payDate}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='maxStudents'
                                label="Maximum Students" 
                                name="maxStudents"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.maxStudents}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='medium'
                                label="Medium" 
                                name="medium"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.medium}
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <TextField
                                id='createdat'
                                label="Createdat" 
                                name="createdat"
                                size='small'
                                disabled = {true}
                                defaultValue={data.subject.createdAt.substring(0,10)}
                            />
                        </Stack>                     
                    </Box>
                    <Box
                        display='flex'
                        flexWrap="wrap"
                        flexDirection='row'
                        sx={{justifyContent:'center', mt:1}}
                    >
                        <Rating value={data.subject.averageRating} precision={0.5} readOnly />
                    </Box>   
                </div>}
            </Box>         
        </Box>
    );
}
 
export default ClassDetails ;