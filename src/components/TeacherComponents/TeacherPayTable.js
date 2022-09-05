import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
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



export default function TeacherPayTable(data) {
  const { subjectid } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
        {data && <TableContainer sx={{  mt: 1}} component={Paper}>
          <Table  size="small" aria-label="customized table">
            <TableHead sx={{backgroundColor: "#3F51B5"}}>
              <TableRow Color= "white">
                <StyledTableCell align="center"><Typography color= "white">Name</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Email</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">IsPaid</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Paid Date</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Enrolled Date</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">View</Typography></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {(rowsPerPage > 0
              ? data.data.students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data.data.students
              ).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.payment._id ?'Yes':'No'}</StyledTableCell>
                  <StyledTableCell align="center">{!row.payment._id ?"-" : row.payment.date.substring(0,10)}</StyledTableCell>
                  <StyledTableCell align="center">{row.enrolledDate.substring(0,10)}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Box
                    sx={{justifyContent:'right', mt:0}}
                  >
                    <Button variant="contained" onClick={()=>{
                      navigate("/teacher/studentdetails/"+row.id)
                    }}
                    sx={{backgroundColor:"#3F51B5",color:"white"}}>
                        view
                    </Button>          
                  </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter sx={{backgroundColor: "white"}}>
              <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[2,4,6,8,10]}
                    count={data.data.students.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page"
                      }
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ page }) => {
                      return `Page: ${page +1}`;
                    }}
                    backIconButtonProps={{
                      color: "secondary"
                    }}
                    nextIconButtonProps={{ color: "secondary" }}
                    showFirstButton={true}
                    showLastButton={true}
                    labelRowsPerPage={<span>Rows:</span>}
                    sx={{
                      ".MuiTablePagination-toolbar": {
                        backgroundColor: "#f2f2f2"
                      },
                      ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                        fontWeight: "bold",
                        color: "blue"
                      }
                    }}
                    >

                    </TablePagination>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>}
      </Box>
  );
}
