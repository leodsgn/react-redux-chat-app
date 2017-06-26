import { IS_SENDING_MESSAGE, SEND_MESSAGE, RECEIVE_MESSAGE } from '../actions/types';

const initialState = {
    messages: [],
    
    isSendingMessage: false
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {

        case IS_SENDING_MESSAGE:
            return Object.assign({}, state, {
                isSendingMessage: true
            })

        case SEND_MESSAGE:
            return Object.assign({}, state, {
                // messages: state.messages.concat(action.payload),
                isSendingMessage: false
            })

        case RECEIVE_MESSAGE:
            return Object.assign({}, state, {
                messages: state.messages.concat(action.payload),
                isSendingMessage: false
            })
    }

    return state
}