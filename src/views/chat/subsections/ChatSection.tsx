import React from "react"
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Divider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface ChatSectionProps {
  id: string;
  imageSrc?: any;
  orderNum: string;
  lastMessage: string;
  date: string | null;
  navigation: () => {}
}

const ChatSection = (props: ChatSectionProps) => {

  return(
    <SafeAreaView style={ChatSectionStyles.root}>
      <TouchableOpacity onPress={() => props.navigation()}>
        <View style={ChatSectionStyles.view}>
            <Icon style={ChatSectionStyles.icon} name="person-outline" size={30}></Icon>
          <View style={ChatSectionStyles.innerView}>
            <Text style={ChatSectionStyles.contactNameText}>{props.orderNum}</Text>
            <View style={ChatSectionStyles.bottomTextContainer}>
              <Text style={ChatSectionStyles.lastMessageText}>{props.lastMessage}</Text>
              {props.date !== null && (<Text style={ChatSectionStyles.date}>{new Date(props.date).toLocaleDateString()}</Text>)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider bold style={ChatSectionStyles.divider}></Divider>
    </SafeAreaView>
  )
}

export default ChatSection

const ChatSectionStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  view: {
    flex: 1,
    flexDirection: "row",
    marginVertical: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  innerView: {
    flex: 1,
    flexDirection: "column",
    marginLeft: '2%'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    marginLeft: '2%'
  },
  contactNameText: {
    marginTop: "1%",
    marginHorizontal: "2%",
    fontWeight: 'bold',
    color: 'black'
  },
  lastMessageText: {
    marginBottom: "1%",
    marginHorizontal: "2%",
    alignSelf: 'flex-start',
    color: 'black'
  },
  date: {
    marginBottom: "1%",
    alignSelf: 'flex-end'
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    marginLeft: "2%",
    alignSelf: "center",
    color:"#FFA500"
  },
  divider: {
    backgroundColor: "#FFA500",
    width: "100%"
  }
});