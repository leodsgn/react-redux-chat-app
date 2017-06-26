import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from './App';
import Chat from './components/chat/chat';

class ChatPage extends Component {


    render(){
        return(
            <App>
                <Chat></Chat>
            </App>
        )
    }
}

export default withRouter(connect()(ChatPage));