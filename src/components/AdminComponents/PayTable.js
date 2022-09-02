import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Typography, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box } from '@mui/system';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { base_url } from '../../Const/Const';
import useFetch from '../../services/useFetch';
import { useNavigate,useParams} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


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
        {/* {data && */}
        <TableContainer sx={{  mt: 1}} component={Paper}>
          <Table  size="small" aria-label="customized table">
            <TableHead sx={{backgroundColor: "#3F51B5"}}>
              <TableRow Color= "white">
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Name</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Email</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Verified</Typography></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.data.students.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center" >
                  <Box
                    sx={{justifyContent:'right', ml:3}}
                  >
                    {/* <Avatar alt="John Doe" src={row.photo.webContentLink}/> */}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  {/* {row.isPending.toString() === 'false' && (
                  <StyledTableCell align="center">Verified</StyledTableCell>
                  )} */}
                  {/* {row.isPending !== 'false' && (
                  <StyledTableCell align="center">Pending</StyledTableCell>
                  )} */}
                  <StyledTableCell align="center">
                  <Box
                    sx={{justifyContent:'right', mt:0}}
                  >
                    <Button variant="none" onClick={()=>{
                      navigate("/admin/studentdetails/"+row._id)
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
        {/* }      */}
      </Box>
  );
}
