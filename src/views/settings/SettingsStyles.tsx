import {StyleSheet} from 'react-native';

export const SettingsStyles = StyleSheet.create({
    titleView:{
        padding: '5%',
        alignItems: 'center',
    },
    title:{
        fontFamily: 'Lato',
        color: '#FFA500',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 24,
    },
    button: {
        backgroundColor: '#D9D9D9',
        width: 'auto',
        height: 70,

      },
    buttonView: {
      padding: '5%',
    },
    icon: {
      height:'90%',
    },
    buttonText:{
      flex: 1,
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      color: '#000000',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '500',
    }
});