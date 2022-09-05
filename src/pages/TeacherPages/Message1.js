import React, { useState,useEffect } from 'react'
import { createStyles, makeStyles, Theme } from "@mui/styles";
// import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./Message";
// import Student1 from '../../images/Student1.jpg';
// import Typography from '@mui/material/Typography';
// import SendIcon from '@material-ui/icons/Send';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "950px",
      maxHeight: "480px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    // paper2: {
    //   width: "80vw",
    //   maxWidth: "500px",
    //   display: "flex",
    //   alignItems: "center",
    //   flexDirection: "column",
    //   position: "relative"
    // },
    container: {
      // width: "100vw",
      // height: "100vh",
       display: "flex",
      // alignItems: "justify",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    },
    wrapForm : {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      },
      wrapText  : {
          width: "100%"
      },
      button: {
          //margin: theme.spacing(1),
      },
  })
);

export default function Message1({socket,username,room}) {
  const classes = useStyles();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const joinRoom = () =>{
    socket.emit("join_room",room);
  }
    
  const sendMessage= async()=>{
    joinRoom();
    //console.log(currentMessage);
      if(currentMessage !== ""){
          const messageData ={
              room:room,
              author: username,
              message : currentMessage,
              time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(), 
          };
          //console.log(messageData);
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
      }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
      
    });
  }, [socket]);

  return (
    <div className={classes.container}>
    

      {/* <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}> */}
          {/* <MessageLeft
            message="Hi Good Morning...!"
            timestamp="MM/DD 00:00"
            photoURL= {john}
            displayName="Teacher 1"
            avatarDisp={true}
          />
          <MessageRight
            message="Hi Good Morning, How are you?"
            timestamp="MM/DD 00:00"
            photoURL={Student1}
            displayName="Student 1"
            avatarDisp={true}
          />
          <MessageLeft
            message="I am fine.How about you? what do you do these days?"
            timestamp="MM/DD 00:00"
            photoURL={john}
            displayName=" "
            avatarDisp={true}
          />
          <MessageRight
            message="I am good, I joined to the new classes for the my next examination."
            timestamp="MM/DD 00:00"
            photoURL={Student1}
            displayName=" "
            avatarDisp={true}
          />
          <MessageLeft
            message="I am fine.How about you? what do you do these days?"
            timestamp="MM/DD 00:00"
            photoURL={john}
            displayName=" "
            avatarDisp={true}
          />
          <MessageRight
            message="I am good, I joined to the new classes for the my next examination."
            timestamp="MM/DD 00:00"
            photoURL={Student1}
            displayName=" "
            avatarDisp={true}
          />
          <MessageLeft
            message="I am fine.How about you? what do you do these days?"
            timestamp="MM/DD 00:00"
            photoURL={john}
            displayName=" "
            avatarDisp={true}
          />
          <MessageRight
            message="I am good, I joined to the new classes for the my next examination."
            timestamp="MM/DD 00:00"
            photoURL={Student1}
            displayName=" "
            avatarDisp={true}
          />
          */}

          {/* <MessageLeft
            message="I am fine.How about you? what do you do these days?"
            timestamp="MM/DD 00:00"
            photoURL={john}
            displayName=" "
            avatarDisp={true}
          />
          <MessageRight
            message="I am good, I joined to the new classes for the my next examination."
            timestamp="MM/DD 00:00"
            photoURL={Student1}
            displayName=" "
            avatarDisp={true}
          />  */}

          {/* Right messsage box */}
          {/* {
            messageList.map((messageContent) => {
              return <MessageRight
              message={messageContent.message}
              timestamp={messageContent.time}
              photoURL={Student1}
              displayName=" "
              avatarDisp={true}
            />
            })
          } */}
    
          {/* Left messsage box */}
          {/* {
            messageList.map((messageContent) => {
              return <MessageLeft
              message={messageContent.message}
              timestamp={messageContent.time}
              photoURL={Student1}
              displayName=" "
              avatarDisp={true}
            />
            })
          } */}
      {/* </Paper> */}
        {/* <TextInput socket={socket} username1={username} room1={room}/> */}
        {/* <form className={classes.wrapForm}  noValidate autoComplete="off"> */}
            {/* <TextField
                id="standard-text"
                label="Type Message here..."
                type="text"
                placeholder='Type Message here...'
                className={classes.wrapText}
                onChange={ (event) => {
                  setCurrentMessage(event.target.value);
                    
                }}
                //margin="normal"
            /> */}
            {/* <Button variant="contained" color="primary" className={classes.button}> */}
            {/* <Button color='primary'  onClick={sendMessage}>
                <SendIcon />
            </Button> */}
            {/* <button onClick={sendMessage}>&#9658;</button> */}
            {/* </form> */}
      {/* </Paper> */}
    </div>
  );
}