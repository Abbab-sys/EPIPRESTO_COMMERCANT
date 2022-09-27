import { StyleSheet } from "react-native"

export const signUpStyles = StyleSheet.create({
    root: {
        backgroundColor: '#FFA500',
        height: '100%',
        flex: 1,

    },
    card: {
        elevation: 4,
        flex: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    signUp:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fieldsView: {
        margin:'5%',
      },
    fieldView: {
        margin:5,
    },
    buttonView: {
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#FFA500',
        width: '70%',
    },
    
})