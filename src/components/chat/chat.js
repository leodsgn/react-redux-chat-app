import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { sendMessage, receiveMessage } from '../../actions/action_creators';
import io from 'socket.io-client';

import './chat.css';

require("dotenv").config();

// const port = process.env.PORT || 8080;
const host = process.env.HOST || "https://gentle-cove-83918.herokuapp.com";

class Chat extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if(!localStorage.getItem("name")) {
            this.props.history.push("/");
        }
    }
    
    componentDidMount() {
        const socket = io.connect(host);

        socket.on("chat_message", data => {
            this.props.receiveMessage(data);
        })
    }

    submitMessage(data) {

        const {sendMessage, reset} = this.props;
        const {message} = data;

        sendMessage({message});
        reset();
        setTimeout(function() {
            document.querySelector(".chat__section").scrollTop = document.querySelector(".chat__section").scrollHeight;
        }, 100);
    }

    render(){

        const { handleSubmit, sendMessage, receiveMessage } = this.props;

        return (
            localStorage.getItem("name") ?
            <main className="chat_page">
                <section className="chat">
                    <section className="chat__section">
                        <ul className="chat__messages">
                            {this.props.messages.map((message, index) => {
                                if(message.user == localStorage.getItem("name")) {
                                    return <li key={index} className="to_right">{message.message}</li>
                                }
                                else {
                                    return <li key={index} className="to_left">{message.message}</li>
                                }
                            })}
                        </ul>
                    </section>
                    <div className="chat__form">
                        <form onSubmit={handleSubmit(this.submitMessage.bind(this))}>
                            <Field name="message" component="input" type="text" placeholder="Enter your name" />
                            <button type="submit">Send message</button>
                        </form>
                    </div>
                </section>
            </main>
            : <Redirect to="/" />
        )
    }
}


const mapStateToProps = state => {
    return {
        ...state.messages
    }
}

const mapDispatchToProps = {
    sendMessage,
    receiveMessage
}

const chatForm = reduxForm({
    form: "chat-form",
    fields: ["message"]
})(Chat)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(chatForm))