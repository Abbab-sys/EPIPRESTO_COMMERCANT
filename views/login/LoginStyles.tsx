import { StyleSheet } from "react-native"

export const LoginStyles = StyleSheet.create({
    root: {
        backgroundColor: '#FFA500',
        height: '100%',
        flex: 1,

    },
    card: {
        elevation: 4,
        flex: 3,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
    },
    imageView: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        resizeMode:'contain',
        width: '100%',
    
    },
    fieldsView: {
        margin:'5%',
        height:'auto',
        // borderColor: '#000000',
        // borderWidth: 1,
    },
    fieldView : {
        padding: 'auto',
    },
    buttonView: {
        // height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FF0000',
        // borderWidth: 1,
        // height: '30%',

    },
    button: {
        backgroundColor: '#FFA500',
        width: '70%',
    },
    
})