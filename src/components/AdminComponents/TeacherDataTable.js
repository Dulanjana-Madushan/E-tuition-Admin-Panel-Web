import * as React from 'react';
import DataTable from './DataTable';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useFetch from '../../useFetch';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     {
//       field: 'name',
//       headerName: 'First name',
//       width: 150,
      
//     },
//     {
//       field: 'email',
//       headerName: 'E-mail',
//       type: 'number',
//       width: 200,
     
//     },
//   ];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'First name',
    width: 150,
    
  },
  {
    field: 'username',
    headerName: 'Last name',
    width: 150,
    
  },
  {
    field: 'email',
    headerName: 'E-mail',
    type: 'number',
    width: 300,
   
  },
  {
    
    headerName: 'Action',
    width: 200,
    
    render: (record) => {
      return(
        <>
          <DeleteForeverIcon/>
        </>
      );
    },
  },
];

const TeacherTable = () => {

  //const [teachers, setUsers]=useState([]);
  //const {data, isLoading, error} = useFetch('http://localhost:5000/users/teachers');

  const [users, setUsers]=useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  },[]);

  //const {data} = useFetch('https://jsonplaceholder.typicode.com/users'); 

  // const [teachers, setUsers]=useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:5000/users/teachers')
  //     .then((response) => response.json())
  //     .then((json) => setUsers(json))
  // },[]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataTable
        rows={users}
        columns={columns}
      />
    </div>
  );
};

export default TeacherTable;





