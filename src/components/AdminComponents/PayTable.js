import * as React from 'react';
import { useNavigate,useParams} from 'react-router-dom';

import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { 
  Typography, 
  Button, 
  Paper, 
  styled } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  ['&.${tableCellClasses.head}']: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  ['&.${tableCellClasses.body}']: {
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



export default function PayTable(data) {
  const { subjectid } = useParams();
  const navigate = useNavigate();
  return (
      <Box 
        display='flex'
        flexDirection='column'
        sx={{ mt: 4, width:'100%'}}  
     >
        <Typography sx={{fontSize:15,fontWeight: 600}}>

                {'Today - ' + new Date().toDateString()}
        </Typography>
        <TableContainer sx={{  mt: 1}} component={Paper}>
          <Table  size="small" aria-label="customized table">
            <TableHead sx={{backgroundColor: "#3F51B5"}}>
              <TableRow Color= "white">
                <StyledTableCell align="center"><Typography color= "white">Id</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Name</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Email</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">IsPaid</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Paid Date</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Enrolled Date</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">View</Typography></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.data.students.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.payment._id !== null ?'No':'Yes'}</StyledTableCell>
                  <StyledTableCell align="center">{row.paidDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.enrolledDate.substring(0,10)}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Box
                    sx={{justifyContent:'right', mt:0}}
                  >
                    <Button variant="contained" onClick={()=>{
                      navigate("/admin/studentdetails/"+row.id)
                    }}
                    sx={{backgroundColor:"#3F51B5",color:"white"}}>
                        view
                    </Button>          
                  </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
}
