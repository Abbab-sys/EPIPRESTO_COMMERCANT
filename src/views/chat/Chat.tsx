import React, {Fragment, useCallback, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {ChatContext} from '../../context/ChatContext';
import {VendorContext} from '../../context/Vendor';
import {Message} from '../../hooks/ChatManagerHook';
import {MessageStatus, Role} from '../../interfaces/ChatInterfaces';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {CHAT_VIEW_ORDER_KEY} from '../../translations/keys/ChatTranslationKeys';
import {useTranslation} from 'react-i18next';

/*
 * Name: Chat
 * Description: This component is used to display the chat linked to a vendor from a specific command.
 * Author: Zouhair Derouich, Adam Naoui-Busson, Khalil Zriba
 */

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

const Chat = ({navigation, route}: any) => {
  const {chatId} = route.params;
  const {t} = useTranslation('translation');
  const {
    chatManager: [chats, {sendMessage, getChatById}],
  } = useContext(ChatContext);

  const {storeId} = useContext(VendorContext);

  // Call sendMessage function from ChatManagerHook when the sent button is pressed
  const onSend = useCallback(
    (newMessage: message[]) => {
      sendMessage(chatId, newMessage[0].text);
    },
    [chatId, sendMessage],
  );

  const chat = getChatById(chatId);

  // Navigate to the order page when the back button is pressed
  const navigateToOrder = () => {
    navigation.navigate('OrderPage', {idOrder: chat?.relatedOrderId});
  };
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
        avatar: '',
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginLeft: '2%', position: 'absolute', left: 0}}
            onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 35,
                height: 35,
                tintColor: 'black',
              }}
              source={require('../../assets/icons/back.png')}
            />
          </TouchableOpacity>

          <Button
            style={{
              margin: 10,
            }}
            mode={'elevated'}
            compact={true}
            buttonColor={'#FFFFFF'}
            textColor={'#000000'}
            onPress={navigateToOrder}>
            {t(CHAT_VIEW_ORDER_KEY)} #{chat?.relatedOrderNumber}
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
