import React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({
    rows,
    columns
}) => {
  return (
    <DataGrid
    getRowId={(rows) => rows._id}
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}

    />
  );
}

export default DataTable;