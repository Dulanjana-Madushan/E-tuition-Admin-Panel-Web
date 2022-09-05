import * as React from 'react';

import { Box } from '@mui/system';
import { 
  Typography,
  CircularProgress, 
  useTheme,
  useMediaQuery} from '@mui/material';
import useFetch from '../../services/useFetch';
import DialogAlert from '../../components/Dialog';
import { base_url } from '../../Const/Const';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TNotification = () => {

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const {data, isLoading, error} = useFetch(base_url + '/notification');
  
  return (  
      <Box
          display='flex'
          flexDirection='column'
          sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
      >
          <Box
              marginTop = {2}
              marginBottom={2}
              display='flex'
              flexWrap="wrap"
              paddingLeft={2}
              paddingTop={1}
              paddingBottom={1}
          >
              <Typography
                  sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}
              >
                  My Notifications
              </Typography>
          </Box>
          <Box
              display='flex'
              flexWrap="wrap"
              sx={{justifyContent:'center'}}
          >
              {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
              {error && <Typography color="red">{error}</Typography>}
              {isLoading && <CircularProgress color="primary" />}
          </Box>
          <Box
                display='flex'
                flexWrap="wrap"
                flexDirection="column"
                sx={{justifyContent:match?'center':'start'}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <Box sx={{ mt: 2}}>
                            <Accordion sx={{backgroundColor:"#c6cbec"}}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    <Typography>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{item.description}</Typography>
                                    <Typography>{item.time.substring(0,10)}</Typography> 
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </div>
                ))}
            </Box>         
          </Box>  
    );
  }

export default TNotification;

