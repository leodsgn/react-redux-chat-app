import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { sendMessage, receiveMessage } from '../../actions/action_creators';
import io from 'socket.io-client';

import './chat.css';

class Chat extends Component {
    constructor(props) {
        super(props)
    }

    renderChatList() {
        return [
            <li key={1} className="to_left">Hey man, how r u doing?</li>,
            <li key={2} className="to_left">have news?</li>,
            <li key={3} className="to_right">Sup man How are you</li>
        ]
    }
    
    componentDidMount() {
        const socket = io.connect("localhost:3001");

        socket.on("chat_message", data => {
            this.props.receiveMessage(data);
        })
    }

    submitMessage(data) {

        const {sendMessage, reset} = this.props;
        const {message} = data;

        sendMessage({message});
        reset();
    }

    render(){

        const { handleSubmit, sendMessage, receiveMessage } = this.props;

        return (
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