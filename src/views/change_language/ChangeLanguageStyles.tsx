import { StyleSheet } from "react-native";

export const ChangeLanguageStyles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#fff',
      height: 70,
      borderRadius: 5,
      margin: 5,
    },
    buttonImageIconStyle: {
      height: '70%',
      width: '20%',
      position: 'absolute',
      resizeMode: 'contain',
    },
    buttonTextStyle: {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      color: '#000000',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '500',
      width: '100%',
      alignSelf: 'center',
    },
    buttonView: {
        padding: '3%',
      },
    back_button: {
      position: 'absolute',
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      marginLeft: 10,
  
    },
    back_button_icon: {
        width: 35,
        height: 35,
        tintColor: '#FFA500',
    },
    titleView: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    
  });