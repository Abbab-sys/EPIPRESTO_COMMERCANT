import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

interface message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  }
}

// export interface IMessage {
//   _id: string | number
//   text: string
//   createdAt: Date | number
//   user: User
//   image?: string
//   video?: string
//   audio?: string
//   system?: boolean
//   sent?: boolean
//   received?: boolean
//   pending?: boolean
//   quickReplies?: QuickReplies
// }

const Chat = () => {
  const [messages, setMessages] = useState<message[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages: message[]) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}

export default Chat;