import { StyleSheet } from "react-native";

export const StoreStyles = StyleSheet.create({
    fieldsView: {
        margin: '5%',
        height: 'auto',
      },
    statusView: {
        margin: '5%',
        flexDirection: 'row',
    },
    titleView: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 19,
      fontStyle: 'normal',
      alignSelf: 'center',
    },
    root: {
      height: '100%',
      flex: 1, 
      backgroundColor: '#EAEAEA'
    },
    button: {
      margin: 10,
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
});