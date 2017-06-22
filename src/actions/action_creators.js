import { SEND_MESSAGE, DO_LOGIN, RECEIVE_MESSAGE, DO_REGISTER, DO_LOGOUT, IS_ERROR } from './types';
import { Redirect } from 'react-router-dom';

// =========== register ============

export const registerName = name => dispatch => {

    console.log(`name ${name} wil be dispatched`);

    localStorage.setItem("name", name);

    dispatch({
        type: DO_LOGIN,
        payload: { name }
    })

}


// =========== send message ============

export const sendMessage = ({message, user}) => dispatch => {

    dispatch({
        type: SEND_MESSAGE,
        payload: { message, user }
    })
    
}

// =========== receive message ============
export const receiveMessage = ({message, user}) => dispatch => {

}