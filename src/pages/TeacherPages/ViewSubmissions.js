import * as React from 'react';
import { useParams} from 'react-router-dom';
import { 
    styled, 
    CircularProgress, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    tableCellClasses, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper} from '@mui/material';
import { Box } from '@mui/system';

import Piechart from '../../components/PieChart';
import DialogAlert from '../../components/Dialog';
import { base_url } from '../../Const/Const';
import useFetch from '../../services/useFetch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ViewSubmissions() {
    const {subjectid, submissionid} = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/submissions/' + submissionid + '/all');

    return (
        <Box 
            display='flex'
            flexDirection='column'
            sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
        >
            <Box
            marginTop = {2}
            display='flex'
            flexWrap="wrap"
            marginBottom={2}
            sx={{justifyContent:'center',backgroundColor:'#D9DDDC', borderRadius: 2}}
            >
                <Typography
                sx={{fontSize:30,mb:1,mt:1}}
                >
                    Student Submissions
                </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <Typography color="red">{error}</Typography>}
                {isLoading && <CircularProgress color="primary" />}
            </Box>
            {data && data.submissions.length === 0 && 
                <Box
                    display='flex'
                    flexWrap="wrap"
                    sx={{justifyContent:'center', pb:5}}
                >
                    <Typography>No Submissions</Typography>
                </Box>}
            {data && data.submissions.length !== 0 &&<Piechart total={data.total} count={data.count}/>}
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center', pb:5}}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Document</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data && data.submissions.map((dt) => (
                            <StyledTableRow key={dt._id}>
                            <StyledTableCell align="center">{dt.student.name}</StyledTableCell>
                            <StyledTableCell align="center">{dt.student.email}</StyledTableCell>
                            <StyledTableCell align="center">
                                <a href={(dt.document.webViewLink)} target='_blank' rel='noreferrer'>
                                    view
                                </a>          
                            </StyledTableCell>
                            <StyledTableCell align="center">{dt.date.substring(0,10)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            
        </Box>
    );
}