import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

function createData(name, email, isPaid) {
  return { name, email, isPaid };
}

const rows = [
  createData('student1', 'student1@email.com', "yes"),
  createData('student2', 'student2@email.com', "no"),
  createData('student3', 'student3@email.com', "no"),
  createData('student4', 'student4@email.com', "yes"),
  createData('student5', 'student5@email.com', "yes"),
];

export default function PayTable() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{  mt: 8, pl:2,pr:2, width:'100%', height:'90vh'}}
    >
      <Typography sx={{fontFamily:"Times New Roman" , fontSize:30,mb:1,mt:1}}>
        Students' Payment Details 
      </Typography>
      <Typography sx={{fontFamily:"Times New Roman" , fontSize:15,}}>
        {'On ' + new Date().toDateString()}
      </Typography>
      <TableContainer sx={{  mt: 1,}} >
        <Table sx={{ maxWidth: '85vw' }} size="small" aria-label="a dense table" stickyHeader>
            <TableHead>
            <TableRow>
                <TableCell  sx={{fontSize:20}}>Name</TableCell>
                <TableCell align="right" sx={{fontSize:20}}>Email</TableCell>
                <TableCell align="right" sx={{fontSize:20}}>IsPaid</TableCell>
                {/* <TableCell align="right" sx={{fontSize:20}}>Carbs&nbsp;(g)</TableCell>
                <TableCell align="right" sx={{fontSize:20}}>Protein&nbsp;(g)</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.isPaid}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
