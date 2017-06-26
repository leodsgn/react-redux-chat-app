import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { messagesReducer } from './messages_reducers';

export default combineReducers({
    form: formReducer,
    messages: messagesReducer
})