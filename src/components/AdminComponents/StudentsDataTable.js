import * as React from 'react';
import DataTable from './DataTable';
import { DataGrid } from '@mui/x-data-grid';
//import useFetch from '../useFetch';
import { useState, useEffect } from "react";


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'username',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    type: 'number',
    width: 200,
    editable: true,
  },
];


const StudentTable = () => {
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
}

export default StudentTable;
