export const CHAT_SEND_MESSAGE = 'CHAT_SEND_MESSAGE';
export const CHAT_DELETE_MESSAGE = 'CHAT_DELETE_MESSAGE';

export interface Messages {
   user: string,
   message: string,
   timestamp: number
}

export interface ChatState {
   messages: Messages[]
}

interface SendMessageAction {
   type: typeof CHAT_SEND_MESSAGE,
   payload: Messages
}

interface DeleteMessageAction {
   type: typeof CHAT_DELETE_MESSAGE,
    meta: {
       timestamp: number
    }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction;

