import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ChatContext} from '../../context/ChatContext';
import {CHATS_TITLE_KEY} from '../../translations/keys/ChatTranslationKeys';
import ChatSection from './subsections/ChatSection';

/*
 * Name: All Chats
 * Description: This file is used to display all the chats of the user.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

const AllChats = ({navigation}: any) => {
  const {chatManager} = useContext(ChatContext);

  const {t} = useTranslation('translation');

  return (
    <SafeAreaView style={AllChatsStyles.root}>
      <View style={AllChatsStyles.view}>
        <Text variant="headlineMedium" style={AllChatsStyles.headline}>
          {t(CHATS_TITLE_KEY)}
        </Text>
      </View>
      {chatManager[0].length === 0 ? (
        <View style={AllChatsStyles.innerView}>
          <Text>{t('chat.noChats')} </Text>
        </View>
      ) : (
        <FlatList
          style={AllChatsStyles.chats}
          data={chatManager[0]}
          renderItem={({item}) => (
            <ChatSection
              id={item.id}
              navigation={() =>
                navigation.navigate('ChatPage', {chatId: item.id})
              }
              orderNum={item.relatedOrderNumber}
              lastMessage={
                item.messages.length > 0 ? item.messages[0].message : ''
              }
              date={
                item.messages.length > 0
                  ? item.messages[item.messages.length - 1].date
                  : null
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default AllChats;

const AllChatsStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFA500',
    fontFamily: 'Lato',
    fontStyle: 'normal',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chats: {
    margin: '4%',
  },
});
