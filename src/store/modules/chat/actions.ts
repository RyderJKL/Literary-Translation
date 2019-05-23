import {Messages, CHAT_SEND_MESSAGE, CHAT_DELETE_MESSAGE, ChatActionTypes, ChatState} from './types'

export function sedMessage(newMessage: Messages): ChatActionTypes {
    return {
        type: CHAT_SEND_MESSAGE,
        payload: newMessage
    }
}

export function deleteMessage(timestamp: number): ChatActionTypes {
    return {
        type: CHAT_DELETE_MESSAGE,
        meta: {
            timestamp
        }
    }
}
