import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/__reducers';

import LoginPage from './Login.js';
import ChatPage from './Chat.js';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const creteStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={creteStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/chat" component={ChatPage}/>
            </Switch>
        </Router>
    </Provider>
    
    , document.getElementById('root'));
registerServiceWorker();
