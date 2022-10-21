import React, {Fragment, useCallback, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {ChatContext} from '../../context/ChatContext';
import {VendorContext} from '../../context/Vendor';
import {Message} from '../../hooks/ChatManagerHook';
import {MessageStatus, Role} from '../../interfaces/ChatInterfaces';
import {SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Divider} from 'react-native-paper';
import {signUpStyles} from '../sign_up/SignUpStyles';

interface message {
  _id: string;
  text: string;
  createdAt: Date;
  role: Role;
  status: MessageStatus;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

const Chat = ({route}: any) => {
  const {chatId} = route.params;

  const {
    chatManager: [chats, {sendMessage, getChatById}],
  } = useContext(ChatContext);

  console.log('CHAT MANAGER: ', chats);
  const {storeId} = useContext(VendorContext);

  // const [messages, setMessages] = useState<message[]>(
  //   chat.messages.map((message: Message) => {
  //   return {
  //     _id: message.id,
  //     text: message.message,
  //     createdAt: new Date(message.date),
  //     role: message.role,
  //     status: message.status,
  //     user: {
  //       _id: message.role === Role.CLIENT ? chat.relatedClientId : storeId,
  //       name: message.role === Role.CLIENT ? chat.relatedClientUsername : "Me",
  //       avatar: message.role === Role.CLIENT ? 'https://placeimg.com/140/140/any' : "https://cdn.shopify.com/s/files/1/0560/5500/5243/products/Huile-pour-cheveux-stimulante.jpg?v=1641949859"
  //     }
  //   }
  // }))

  const onSend = useCallback(
    (newMessage: message[]) => {
      sendMessage(chatId, newMessage[0].text);
      // chatManager[1](chat.id, newMessage[newMessage.length - 1].text);
      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    },
    [chatId, sendMessage],
  );

  const navigateToOrder = () => {
    console.log('Navigate to order'); //TODO: Navigate to order
  };
  const chat = getChatById(chatId);
  const messages = chat?.messages.map((message: Message) => {
    return {
      _id: message.id,
      text: message.message,
      createdAt: new Date(message.date),
      role: message.role,
      status: message.status,
      user: {
        _id: message.role === Role.CLIENT ? chat.relatedClientId : storeId,
        name: message.role === Role.CLIENT ? chat.relatedClientUsername : 'Me',
        avatar:
          message.role === Role.CLIENT
            ? 'https://placeimg.com/140/140/any'
            : 'https://cdn.shopify.com/s/files/1/0560/5500/5243/products/Huile-pour-cheveux-stimulante.jpg?v=1641949859',
      },
    };
  });
  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: '#FF9933',
        }}
      />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FF9933',
            elevation: 4,
          }}>
          <Button
            style={{
              margin: 10,
            }}
            mode={'elevated'}
            compact={true}
            buttonColor={'#FFFFFF'}
            textColor={'#000000'}
            onPress={navigateToOrder}>
            View Order
          </Button>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messagesToSend: message[]) => onSend(messagesToSend)}
          user={{
            _id: storeId,
          }}
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default Chat;
