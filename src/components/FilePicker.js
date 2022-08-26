import { Button, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import Stack from '@mui/material/Stack';

const FilePicker = () => {
    const [image, setImage] = useState(null);
    const inputFile = useRef(null);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

            setImage(files[0]);
        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };

    console.log("imageimage", image);
    return (
        <div>
            <input
                style={{ display: "none", maxWidth: "sm" }}
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
            />

            <Stack spacing={2} direction="row" border={1} m={1} p={1}>
                <Button variant="contained" onClick={onButtonClick}
                    sx={{backgroundColor:"green",color:"white"}}>
                        Choose a file
                </Button>   
                {
                    handleFileUpload.filename !== ""  //if there is a file
                    ?<Typography
                        sx={{fontFamily:"Times New Roman" , fontSize
                        :20,}}
                    >
                        File choosed
                    </Typography>
                    :<Typography
                        sx={{fontFamily:"Times New Roman" , fontSize
                        :20,}}
                    >
                        No file choosen
                    </Typography>
                }
            </Stack>
        </div>
    );
};

export default FilePicker;