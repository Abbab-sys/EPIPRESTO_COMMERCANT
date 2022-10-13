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
    
  });