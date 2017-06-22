import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import App from './App';
import Login from './components/login/login';

class LoginPage extends Component {

    render() {
        return (
            <App>
                <Login />
            </App>
        )
    }
}

export default withRouter(LoginPage);