import * as React from 'react';
import DataTable from './DataTable';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';
import { forwardRef } from 'react';
import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHistory,useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';




const StudentTable = () => {
  const history = useHistory();
  const { subjectid } = useParams();

  const {data, isLoading, error} = useFetch(base_url + '/admin/students'); 
  console.log(data);

  const MatEdit = ({index}) =>{
    const handleEditClick = () => {
      
    }
  
    return <FormControlLabel
              control={
                <IconButton  onClick={()=>{
                  history.push("/studentdetails/"+index);
                  console.log(index);
                 }}>
                  <Edit/>
                </IconButton>
              }
            />
  };
              
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 , hide:true},
    {
      field: 'edit',
      headerName: 'Edit',
      width: 200,
      disableClickEventBubbling:true,
      renderCell: (params) => {
        return (
          <div>
            <MatEdit index={params.row._id}/>
          </div>
        );
      }
    },
    {
      field: 'name',
      headerName: 'First name',
      width: 200,
  
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 300,
  
    },
    {
      field: 'isPending',
      headerName: 'Status(verified or not)',
      width: 300,
  
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading && <CircularProgress color="success" />}
      {data && <DataTable
        rows={data}
        columns={columns}
        
      />}
    </div>
  );
}

export default StudentTable;
