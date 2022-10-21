import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";

export interface ChatSectionProps {
  id: string;
  imageSrc?: any;
  contactName: string;
  lastMessage: string;
  navigation: () => {}
}

const ChatSection = (props: ChatSectionProps) => {

  return(
    <TouchableOpacity onPress={() => props.navigation()}>
      <View style={ChatSectionStyles.root}>
        {props.imageSrc ? 
          (<Image style={ChatSectionStyles.image} source={{uri: props.imageSrc}}/>) 
          : 
          (<Icon style={ChatSectionStyles.icon} name="user" size={30}></Icon>)}
        <View style={ChatSectionStyles.view}>
          <Text style={ChatSectionStyles.text}>{props.contactName}</Text>
          <Text style={ChatSectionStyles.text}>{props.lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChatSection

const ChatSectionStyles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFA500",
    marginVertical: "4%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  },
  view: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    marginLeft: "2%"
  },
  text: {
    marginVertical: "1%",
    marginHorizontal: "2%"
  },
  icon: {
    marginLeft: "2%",
    alignSelf: "center"
  }
});