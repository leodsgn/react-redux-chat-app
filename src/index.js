import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/__reducers';

import LoginPage from './Login';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const creteStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={creteStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <Router basename="/">
            <Switch>
                <Route path="" component={LoginPage}/>
            </Switch>
        </Router>
    </Provider>
    
    , document.getElementById('root'));
registerServiceWorker();
