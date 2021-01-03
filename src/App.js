import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import { useState, useEffect } from "react";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    // {userName: 'ajax',message: 'yoyo'},
    // {userName: 'rio',message: 'thats rocking'}
  ]);
  const [userName, setUsername] = useState("");

  //useState= temp variable in REACT
  //useEffect= run code on a condition on REACT
  useEffect(() => {
    // run the code here
    // if its blank inside [], this code runs ONCE when the app component loads
    setUsername(prompt("Please enter you name"));
  }, []); //condition

  const sendMessage = (event) => {
    //all messages
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      userName: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessages([...messages, { userName: userName, message: input }]);
    setInput("");
  };

  useEffect(() => {
    //run once when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(doc =>({id: doc.id,message: doc.data()})));
      });
  }, []);

  return (
    <div className="App">
       <img width='15%' height='auto' src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"></img> 
      {/* <h1>Chatto</h1> */}
      <h2 className="app__Welcome">Welcome {userName}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter Messages...</InputLabel>
          <Input className="app__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon/>
          </IconButton>
        </FormControl>
      </form>
 
      <FlipMove>
        {messages.map(({id,message}) => (
          <Message key={id} userName={userName} message={message} />
        ))}
      </FlipMove>

    </div>
  );
}

export default App;
//1.17.58
