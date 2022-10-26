import React, {useContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {ChatContext} from '../../context/ChatContext';
import ChatSection from './subsections/ChatSection';

const AllChats = ({navigation}: any) => {
  const {chatManager} = useContext(ChatContext);

  console.log('CHAT MANAGER: ', chatManager[0]);

  return (
    <SafeAreaView style={{flex: 1, margin: '4%'}}>
      <FlatList
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
            date={item.messages.length > 0 ? item.messages[item.messages.length - 1].date : null}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default AllChats;

const AllChatsStyles = StyleSheet.create({
  root: {
    flex: 1,
    margin: '4%',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
  },
  innerView: {
    flex: 1,
    flexDirection: 'row',
  },
});
