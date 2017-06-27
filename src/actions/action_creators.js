import { SEND_MESSAGE, DO_LOGIN, RECEIVE_MESSAGE, DO_REGISTER, DO_LOGOUT, IS_ERROR } from './types';
import IO from 'socket.io-client';

require("dotenv").config({path: "../../"});

const port = 8080;
const host = "gentle-cove-83918.herokuapp.com";

const io = IO(host + ":" + port);

// =========== register ============

export const registerName = ({name}) => dispatch => {

    console.log(port + host);

    console.log(`name ${name} wil be dispatched`);

    localStorage.setItem("name", name);

    io.emit("new_connection", `${name} connected!`)

    dispatch({
        type: DO_LOGIN,
        payload: { name }
    })
    

}

// =========== send message ============

export const sendMessage = ({message}) => dispatch => {

    const user = localStorage.getItem("name");

    io.emit("chat_message", {user, message});

    dispatch({
        type: SEND_MESSAGE,
        payload: { message, user, sent: true}
    })
    
}

// =========== receive message ============
export const receiveMessage = ({message, user, sent}) => dispatch => {

    console.log("message received \n");
    console.log(`${user} sent a message: \n${message}`);

    dispatch({
        type: RECEIVE_MESSAGE,
        payload: { message, user, sent: false }
    })

}