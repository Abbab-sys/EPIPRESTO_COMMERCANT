import {createContext} from 'react';
import {Chat, ChatManager} from '../hooks/ChatManagerHook';

export const ChatContext = createContext({
  chatManager: [
    [] as Chat[],
    {
      sendMessage: (channelId: string, content: string) => {},
      getChatById: (chatId: string) => {},
    },
  ] as ChatManager,
  // setChatManager: () => {},
});
