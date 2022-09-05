import React, { useRef } from "react";
import { useEffect } from "react";

import { 
    Button, 
    Typography, 
    Box, 
    Stack } from "@mui/material";

const FilePicker = ({image, setImage}) => {

  useEffect(()=>{},[image]);

    const inputFile = useRef(null);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
            setImage(files[0]);
        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const clearImage = () => {
      setImage(null);
  };

    return (
        <div>
            <input
                style={{ display: "none", maxWidth: "sm" }}
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
            />

            <Stack spacing={2} direction="row" border={1} p={1} borderRadius={2}>
                <Button variant="contained" onClick={onButtonClick}>
                    Choose file
                </Button>  
                <Box
                    display='flex'
                    flexWrap="wrap"
                    flexDirection='column'
                    sx={{justifyContent:'center'}}
                >
                    {image != null //if there is a file
                        ?<Typography>
                            {image.name}
                        </Typography>
                        :<Typography>
                            No file choosen
                        </Typography>
                      }
                  </Box> 
                
            </Stack>
            {image != null && <Box
                    display='flex'
                    flexWrap="wrap"
                    flexDirection='row'
                    sx={{justifyContent:'right', mt:1}}
                >
                    <Button  variant="contained" onClick={clearImage} sx={{backgroundColor:"red",color:"white"}}>
                        Clear
                    </Button>

                </Box>
    }
        </div>
    );
};

export default FilePicker;