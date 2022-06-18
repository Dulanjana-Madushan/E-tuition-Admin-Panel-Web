import * as React from 'react';
import DataTable from './DataTable';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../useFetch'
import { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    width: 200,
   
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
  const [users, setUsers]=useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  },[]);

  //const {data} = useFetch('https://jsonplaceholder.typicode.com/users'); 

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

{/*const TeacherTable = () => {

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName',headerName: 'First name',width: 150  },
    { field: 'lastName',headerName: 'Last name',width: 150  },
    { field: 'age',headerName: 'Age',type: 'number',width: 70}  ,
  ];

  return (
    <DataTable
        rows={rows}
        columns={columns}
    />
  );
}

export default TeacherTable;*/}



