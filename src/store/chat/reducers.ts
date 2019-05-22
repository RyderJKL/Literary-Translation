import {
    ChatState,
    ChatActionTypes,
    CHAT_SEND_MESSAGE,
    CHAT_DELETE_MESSAGE
} from './types'

const initialState: ChatState = {
    messages: []
};

export function chatReducer( state = initialState, action: ChatActionTypes ): ChatState {
    switch (action.type) {
        case CHAT_SEND_MESSAGE:
            return {
                messages: [ ...state.messages, action.payload]
            };

        case CHAT_DELETE_MESSAGE:
            return {
                messages: state.messages.filter(message => message.timestamp != action.meta.timestamp)
            };

        default:
            return state;
    }
}
