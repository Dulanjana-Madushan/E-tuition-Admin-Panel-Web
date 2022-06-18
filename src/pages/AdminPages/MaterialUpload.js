import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom';


export default function MaterialUpload() {

const theme = useTheme();
const history = useHistory();
  


  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
    >
    <Typography>Material Upload</Typography>
</Box>
  )
}
