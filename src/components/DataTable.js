import React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({
    rows,
    columns,
}) => {
  return (
    <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
    />
  );
}

export default DataTable;