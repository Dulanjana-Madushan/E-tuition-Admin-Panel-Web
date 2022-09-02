import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';
import { makeStyles }from '@mui/styles';
import { 
    Typography, 
    Button, 
    Card, 
    CardContent, 
    CardMedia, 
    CardActions, 
    useTheme, 
    useMediaQuery } from '@mui/material';

const useStyles = makeStyles({
    media: {
        "&:hover": {
            transform: "scale3d(1.2, 1.2, 1)",
            transition: "1s"
        }
    }
});

export default function ClassCard({data}) {
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
          sx={{backgroundColor:'#EDF5E1', m:1}}
        >
            <Card sx = {{width: match?'85vw':200}}>
                <CardMedia
                    alt="class media"
                    className={classes.media}
                    style={{height: 50, paddingTop: '56.25%'}}
                    image={data.post.webContentLink}
                />
                <CardContent onClick={()=>{navigate("/teacher/subjects/" + data._id);}}>
                    <Typography  gutterBottom height={30} overflow='clip' variant="h6" component="div">
                        {data.subject}
                    </Typography>
                    <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button size="small" onClick={()=>navigate('/teacher/subjects/' + data._id + '/update')}>Update</Button>
                    <Button sx={{color:'red'}} size="small">Delete</Button>
                </CardActions>
            </Card>
        </Box>
    );
}