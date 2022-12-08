import {createContext} from 'react';
import {Chat, ChatManager} from '../hooks/ChatManagerHook';

/*
 * Name: Chat Context
 * Description: This file contains the chat manager in a context.
 * Author: Adam Naoui-Busson
 */

export const ChatContext = createContext({
  chatManager: [
    [] as Chat[],
    {
      sendMessage: (channelId: string, content: string) => {},
      getChatById: (chatId: string) => {},
    },
  ] as ChatManager,
});
