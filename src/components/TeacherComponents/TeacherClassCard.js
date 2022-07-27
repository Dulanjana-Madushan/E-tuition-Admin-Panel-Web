import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Box } from '@mui/system';
import { makeStyles }from '@mui/styles';
import { Typography, Card, CardContent, CardMedia, CardActionArea, useTheme, useMediaQuery } from '@mui/material';

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
    const history = useHistory();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
          sx={{backgroundColor:'#EDF5E1', m:1}}
        >
            <Card
                sx = {{width: match?'85vw':200, height:match?'':300}} 
                onClick={()=>{history.push("/subjects/" + data._id);}}
            >
                <CardActionArea>
                    <CardMedia
                        alt="class media"
                        className={classes.media}
                        style={{height: 50, paddingTop: '56.25%'}}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cmu-yfeosVSTyQwE1Iy2XP0v_KWNK6w7hA&usqp=CAU"
                    />
                    <CardContent>
                        <Typography  gutterBottom height={30} overflow='clip' variant="h6" component="div">
                            {data.subject}
                        </Typography>
                        <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
                            {data.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}