import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory as history } from 'history';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/__reducers';

import LoginPage from './Login.js';
import ChatPage from './Chat.js';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

require("dotenv").config();

const creteStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={creteStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <Router history={ history }>
            <Switch>
                <Route exact path="/" component={ LoginPage } />
                <Route path="/chat" component={ ChatPage }/>
            </Switch>
        </Router>
    </Provider>
    
    , document.getElementById('root'));
registerServiceWorker();
